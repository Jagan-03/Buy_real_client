import { useEffect } from "react";
import jwt from "jsonwebtoken";

import { Box, Flex, Text, Avatar } from "@chakra-ui/react";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";
import { useRouter } from "next/router";

import { BASE_URL, fetchApi } from "../../utils/fetchApi";
import ImageDisplay from "../../components/ImageDisplay";

const PropertyDetails = ({
  propertyDetails: {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
  },
}) => {
  
  const router = useRouter();
  
  useEffect(() => {
    (async() => {
      const token = localStorage.getItem("buy_real_userToken");
      const decodedToken = jwt.decode(token);
      if(decodedToken){
        if(decodedToken.exp*1000 <= Date.now()){
              localStorage.setItem("buy_real_userToken", "null");
              localStorage.setItem("buy_real_user", "null");
              localStorage.setItem("buy_real_profile", "null");
              router.push("/login");
            }
        } else router.push("/login");
    })();
}, [router]);

  return (
    <Box maxWidth="1000px" margin="auto" p="4">
      {photos && <ImageDisplay data={photos} />}
      <Box w="full" p="6">
        <Flex paddingTop="2" direction="column" justifyContent="space-between">
          <Flex alignItems="center" justifyContent="space-between">
            <Box paddingRight="3" color="green.400">
              {isVerified && <GoVerified />}
            </Box>
            <Text fontWeight="bold" fontSize="lg">
              INR {millify(price)} {rentFrequency && `/ ${rentFrequency}`}
            </Text>
            <Box>
              <Avatar size="sm" src={agency?.logo?.url} />
            </Box>
          </Flex>
          <Flex
            alignItems="center"
            p="1"
            justifyContent="space-between"
            w="250px"
            color="blue.400"
          >
            {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft{" "}
            <BsGridFill />
          </Flex>
          <Box marginTop="2">
            <Text fontSize="lg" marginBottom="2" fontWeight="bold">
              {title}
            </Text>
            <Text lineHeight="2" color="gray.600">
              {description}
            </Text>
          </Box>
          <Flex
            flexWrap="wrap"
            textTransform="uppercase"
            justifyContent="space-between"
          >
            <Flex
              justifyContent="space-between"
              w="400px"
              borderBottom="1px"
              borderColor="gray.100"
              p="3"
            >
              <Text>Type</Text>
              <Text fontWeight="bold">{type}</Text>
            </Flex>
            <Flex
              justifyContent="space-between"
              w="400px"
              borderBottom="1px"
              borderColor="gray.100"
              p="3"
            >
              <Text>Purpose</Text>
              <Text fontWeight="bold">{purpose}</Text>
            </Flex>
            {furnishingStatus && (
              <Flex
                justifyContent="space-between"
                w="400px"
                borderBottom="1px"
                borderColor="gray.100"
                p="3"
              >
                <Text>Furnishing Status</Text>
                <Text fontWeight="bold">{furnishingStatus}</Text>
              </Flex>
            )}
          </Flex>
          <Box>
            {amenities.length && (
              <Text fontSize="2xl" fontWeight="black" marginTop="5">
                Amenities
              </Text>
            )}
            <Flex flexWrap="wrap">
              {amenities.map((item) =>
                item.amenities.map((amenity) => (
                  <Text
                    key={amenity.text}
                    fontWeight="bold"
                    color="blue.400"
                    fontSize="l"
                    p="2"
                    bg="gray.200"
                    m="1"
                    borderRadius="5"
                    >
                    {amenity.text}
                    </Text>
                ))
              )}
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default PropertyDetails;

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(`${BASE_URL}/properties/detail?externalID=${id}`);
  return {
    props: {
      propertyDetails: data,
    },
  };
}
