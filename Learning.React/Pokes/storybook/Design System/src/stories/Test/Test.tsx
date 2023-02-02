import React, {FC} from 'react'
import { TestProps } from './Test.d'

export const Test : FC<TestProps> = ({string, number}) => <div>Hello World {string} {number}</div>