'use client'
import React from 'react';
import Image from 'next/image';
import { FC, RefObject, useRef, useState } from 'react';
import cls from './select.module.scss'
import classNames from "../../common/lib/classNames/classNames";
import Icon from '../../../public/arrow.svg'

interface ISelect {
  id: string
  className?: string
  optionsList: OptionsList[];
  onChange: (id: string) => void
  value: string
  disabled?: boolean
}

export interface OptionsList {
  id: string;
  value: string;
}

export const Select: FC<ISelect> = (props) => {
  const {
    id,
    onChange,
    value,
    optionsList,
    className,
    disabled
  } = props

  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const leagueInput = useRef() as RefObject<HTMLInputElement>;

  const filteredOptionsList = optionsList.filter((item) => item.id !== id)

  const selectValue = (id: string) => {
    if (onChange) {
      onChange(id)
    }
    setOpenSelect(false);
  }

  const openOption = () => {
    if (!disabled) {
      setOpenSelect(prevState => !prevState);
    }
  }

  return (
    <div className={classNames(cls.select, {[cls.disabled]: disabled}, [className])}>
      <div className={classNames(cls.wrapperInput, {})} onClick={openOption}>
        <input
          className={cls.input}
          id="input"
          type="button"
          value={value}
          onBlur={() => {
            setOpenSelect(false);
          }}
          ref={leagueInput}
          readOnly
          disabled={disabled}
        />
        <div className={classNames(cls.prefix, {[cls.disabled]: disabled})}>
          <Image
              src={Icon}
              className={classNames(cls.icon, {[cls.active]: openSelect})} width={10}
              alt="Arrow"
          />
        </div>
      </div>

      <div className={classNames(cls.options, {[cls.active]: openSelect})}>
        {filteredOptionsList.map((item, index) => (
          <li
            onClick={() => selectValue(item.id)}
            key={index}
            className={cls.li}
          >
            {item.value}
          </li>
        ))}
      </div>
    </div>
  );
}
