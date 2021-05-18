import React, { useState, useEffect } from 'react'
import { NativeSelect, FormControl, StylesProvider } from '@material-ui/core'
import { fetchCountries } from '../../api/index'

import styles from './CountryPicker.module.css'

const CountryPicker = ({ handleCountryChange }) => {
    const [fetchCountry, setFetchCountry] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            setFetchCountry(await fetchCountries())
        }

        fetchApi()
    }, [setFetchCountry])

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue='' onChange={(e) => {handleCountryChange(e.target.value)}}>
                <option value=''>Global</option>
                {fetchCountry.map((country, i) => <option value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker