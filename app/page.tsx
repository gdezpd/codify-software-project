'use client'
import React, {useEffect, useState} from "react";
import styles from './page.module.css'
import {getAllData} from "../services/getData";
import {WrapperApexGraph} from "./components/wrapperApexGraph/WrapperApexGraph";

export interface IData {
    [key: string]: Record<string, number>
}

export default function Home() {

    const [data, setData] = useState<IData>()

    useEffect(() => {
            getAllData().then( (res)=> {
                if (res){
                    setData(res)
                }
            })
    }, [])

    return (
        <main className={styles.main}>
            {data ? <WrapperApexGraph data={data}/> : 'Loading...'}
        </main>
    )
}
