'use client'
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import cls from './wrapperApexGraph.module.scss'
import { Select } from "../select/Select";
import { ApexGraph } from "../apexGraph/ApexGraph";

export const SELECT = {
    YEAR: 'year',
    HALF_YEAR: 'half_year',
    MONTH: 'month'
}

interface IWrapperApexGraph {
    data: Record<string, number>
}

export const WrapperApexGraph = (props: IWrapperApexGraph) => {
    const {data} = props;
    const [selectedData, setSelectedData] = useState<any>();
    const [values, setValues] = useState({id: SELECT.YEAR, value: 'За последний год'});

    useEffect(()=> {
        if (data){
            setSelectedData({[values.id]: data[values.id]})
        }
    },[data, values.id])

    const optionsList = useMemo(() => [
        {id: SELECT.YEAR, value: "За последний год"},
        {id: SELECT.HALF_YEAR, value: "За последние 6 месяцев"},
        {id: SELECT.MONTH, value: "За последний месяц"}
    ],[])

    const onChange = useCallback((id:string) => {
        const selectedOption = optionsList.find((option) => option.id === id);
        if (selectedOption) {
            const {id, value} = selectedOption;
            setValues({id, value});
            setSelectedData({[id]: data[id]});
        }
    }, [data, optionsList]);

    return (
        <div className={cls.wrapper}>
            <Select optionsList={optionsList}
                    onChange={onChange}
                    value={values.value}
                    id={values.id}
            />
            <ApexGraph selectedData={selectedData}/>
        </div>
    );
};
