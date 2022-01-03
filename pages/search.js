import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Flex, Box, Text, Icon } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";

import jwt from "jsonwebtoken";
import SearchFilters from "../components/SearchFilters";
import Property from "../components/Property";
import noresult from "../assets/images/noresult.svg";
import { fetchApi, BASE_URL } from "../utils/fetchApi";

const Search = ({ properties }) => {
    
    const [searchFilters, setSearchFilters] = useState(false);
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
        <Box bg="gray.900">
            <Flex
                cursor="pointer"
                bg="blue.500"
                p="2"
                fontWeight="black"
                fontSize="lg"
                justifyContent="center"
                alignItems="center"
                onClick={() => setSearchFilters((prevFilters) => !prevFilters)}
            >
                <Text color="gray.100">Search Property By Filters</Text>
                <Icon paddingLeft="2" w="7" as={BsFilter} />
            </Flex>

            {searchFilters && <SearchFilters />}

            <Text fontSize="2xl" p="4" fontWeight="bold" color="white">
                Properties {router.query.purpose}
            </Text>
            <Flex flexWrap="wrap" justifyContent="center">
                {properties.map((property) => <Property property={property} key={property.id}/>)}
            </Flex>

            {properties.length === 0 && (
                <Flex justifyContent="center" alignItems="center" flexDirection="column" marginTop="5" marginBottom="5">
                    <Image alt="no result" src={noresult} />
                    <Text fontSize="2xl" marginTop="3">No Results Found</Text>
                </Flex>
            )}

        </Box>
    )
}

export default Search;

export async function getServerSideProps({ query }) {
    const purpose = query.purpose || 'for-rent';
    const rentFrequency = query.rentFrequency || 'yearly';
    const minPrice = query.minPrice || '0';
    const maxPrice = query.maxPrice || '1000000';
    const roomsMin = query.roomsMin || '0';
    const bathsMin = query.bathsMin || '0';
    const sort = query.sort || 'price-desc';
    const areaMax = query.areaMax || '35000';
    const locationExternalIDs = query.locationExternalIDs || '5002';
    const categoryExternalID = query.categoryExternalID || '4';
  
    const data = await fetchApi(`${BASE_URL}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);
  
    return {
      props: {
        properties: data?.hits,
      },
    };
  }