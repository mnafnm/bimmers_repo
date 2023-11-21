import { Box, InputGroup, Input, InputRightElement, } from '@chakra-ui/react'
import React from 'react'
import { SearchIcon } from '@chakra-ui/icons'

const Filters = ({ columnFilters, setColumnFilters }) => {
    const taskName = columnFilters.find(
        (f) => f.id === "task"
    )?.value || "";


    const onFilterChange = (id, value) => setColumnFilters(
        prev => prev.filter(f => f.id !== id).concat({
            id, value
        })
    )
    return (
        <Box mb={6}>
            <InputGroup size='sm' maxW='12rem'>
                <InputRightElement pointerEvents='none'>
                    <SearchIcon />
                </InputRightElement>
                <Input
                    type="text"
                    variant="filled"
                    placeholder='Search'
                    borderRadius={5}
                    value = {taskName}
                    onChange = {
                        (e) => onFilterChange("task", e.target.value)
                    }
                />
            </InputGroup>

        </Box>
    )
}

export default Filters