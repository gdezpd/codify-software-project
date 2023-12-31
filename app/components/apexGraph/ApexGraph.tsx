'use client'
import React, {useEffect, useState} from "react";
import dynamic from "next/dynamic";
import {IData} from "@component/app/page";

const ApexChart = dynamic(() => import("react-apexcharts"), {ssr: false});

export interface IApexGraphProps {
    selectedData: IData
}

export const ApexGraph = ({selectedData}: IApexGraphProps) => {

    const [axisX, setAxisX] = useState<string[]>([])
    const [axisY, setAxisY] = useState<number[]>([])

    useEffect(() => {
        if (selectedData) {
            const arrX = Object.values(selectedData).map((key) => Object.keys(key))
            const arrY = Object.values(selectedData).map((value) => Object.values(value))
            setAxisX(arrX[0])
            setAxisY(arrY[0])
        }
    }, [selectedData])

    let options = {
        chart: {
            id: "basic-bar",
            background: '#fff2fe'
        },
        xaxis: {
            categories: axisX,
        },
        colors: ['#000aff']
    }
    let series = [{
        data: axisY
    }]

    return (
        <div className="app">
            <div className="row">
                <div className="mixed-chart">
                    <ApexChart
                        options={options}
                        series={series}
                        type="bar"
                        width="995"
                        height="400"
                    />
                </div>
            </div>
        </div>
    )
}

