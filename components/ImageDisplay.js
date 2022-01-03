import React from "react";
import Image from "next/image";
import { Box, Icon, Flex } from "@chakra-ui/react";

const ImageDisplay = ({ data }) => {

    const [selectedImage, setSelectedImage] = React.useState(data[0].url);
    console.log(data[0].url);
    const changeImage = (url) => {
        setSelectedImage(url);
    }

  return (
    <Flex border="gray.100" direction="column" justifyContent="center" alignItems="center">
        <Box p="1">
            <img
                alt="property"
                src={selectedImage}
                className="property-image"
            />
        </Box>

    <Flex flexWrap="wrap" justifyContent="center">
      {data.map((item) => {
        return (
          <Box key={item.id} itemId={item.id} cursor="pointer" m='2'>
            <Image
              alt="property"
              boxSize="100px"
              objectFit="cover"
              src={item.url}
              width={50} 
              height={50}
              className="image-blocks"
              onClick={() => changeImage(item.url)}
            />
          </Box>
        );
      })}
    </Flex>
    </Flex>
  );
};

export default ImageDisplay;
