import { RuleObject } from 'antd/es/form';
import { ReactNode } from 'react';

export interface Options {
  value: string;
  label: string;
  optionImage?: string;
  school_code?: string;
  subsystem?: string;
}

export interface Rule {
  pattern?: RegExp;
  min?: number;
  differentFrom?: string;
  message: string;
  equalTo?: string;
}

export interface Question {
  id: number;
  required: boolean;
  name: string;
  question: string | ReactNode;
  option?: Options[];
  type: string;
  max?: number;
  min?: number;
  step?: string;
  hook?: 'tolowercase';
  disable?: boolean;
  editable?: boolean;
  validation_rules?: RuleObject[];
}

export interface IRegister {
  id: number;
  name: string;
  questions: Question[];
}
