import React from "react";
import {TextField, Grid} from "@mui/material";
import { Controller } from "react-hook-form";

const FormInput = ({name, label, control}) => {

    return (
        <div item xs={12} sm={6}>
            <Controller 
                control={control}
                label={label}
                name={name}
                render = {({field})=> (
                <TextField
                    {...field}
                    fullWidth
                    label={label}
                    required
                />
                )}
                
            />
        </div>
    )
}

export default FormInput;