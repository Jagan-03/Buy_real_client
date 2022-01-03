import React from "React";
import Link from "next/link";
import Image from "next/image";
import { Flex, Box, Text, Button } from "@chakra-ui/react";

import { BASE_URL, fetchApi } from "../utils/fetchApi";

import Property from "../components/Property";

const Banner = ({purpose, title1, title2, desc1, desc2, buttonText, linkName, imageUrl}) => {
  return <Flex flexWrap="wrap" justifyContent="" alignItems="center" bg="blue.500">
    <Image src={imageUrl} width={700} height={500} alt="banner" />
    <Box p="5" marginLeft="5">
      <Text color="grey.500" fontSize="sm" fontWeight="medium">{purpose}</Text>
      <Text fontSize="3xl" fontWeight="bold">{title1} <br /> {title2}  </Text>
      <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="grey.700">{desc1} <br /> {desc2} </Text>
      <Button fontSize="l">
        <Link href={linkName}>
          {buttonText}
        </Link>
      </Button>
    </Box>
  </Flex>
}

export default function Home({propertiesFoSale, propertiesFoRent}) {

  

  return (
    <Box>

      <Banner
        purpose="RENT A HOME"
        title1="Rental Homes for"
        title2="Everyone"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Renting"
        linkName="/search?purpose=for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />

      <Flex flexWrap="wrap" justifyContent="center" bg="gray.900" paddingTop="10">
        {propertiesFoRent.map(property => <Property property={property} key={property.id}/>)}
      </Flex>

      <Banner
        purpose="BUY A HOME"
        title1="Find, Buy, Own Your"
        title2="Dream Home"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Buying"
        linkName="/search?purpose=for-sale"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />

      <Flex flexWrap="wrap" justifyContent="center" bg="gray.900" paddingTop="10">
        {propertiesFoSale.map(property => <Property property={property} key={property.id}/>)}
      </Flex>

    </Box>
  )
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${BASE_URL}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
  const propertyForRent = await fetchApi(`${BASE_URL}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);

  return {
    props : {
      propertiesFoSale : propertyForSale?.hits,
      propertiesFoRent : propertyForRent?.hits,
    }
  }

}