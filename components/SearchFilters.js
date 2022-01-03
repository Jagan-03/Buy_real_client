import { useState } from "react";
import { Flex, Select, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { filterData, getFilterValues } from "../utils/filterData";

const SearchFilters = () => {

    const router = useRouter();
    const [filters, setFilters] = useState(filterData);

    const searchProperties = (filterValues) => {
        const path = router.pathName;
        const { query } = router;

        const values = getFilterValues(filterValues);
        values.forEach(item => {
            if(item.value && filterValues?.[item.name]) {
                query[item.name] = item.value;
            }
        });

        router.push({pathname : path, query});
    }

    return (
        <Flex bg="gray.100" p="4" justifyContent="center" flexWrap="wrap">
            {filters.map(filter => {
                return <Box key={filter.queryName}>
                    <Select 
                        onChange={(e) => searchProperties({[filter.queryName] : e.target.value})}
                        placeholder={filter.placeholder}
                        w="fit-content"
                        p="2"
                    >
                        {filter?.items?.map(item => {
                            return <option value={item.value} key={item.value}>
                                {item.name}
                            </option>
                        })}
                    </Select>
                </Box>
            })}

            

        </Flex>
    )
}

export default SearchFilters;