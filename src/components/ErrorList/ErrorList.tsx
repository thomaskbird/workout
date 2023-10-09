import {FieldErrors} from 'react-hook-form';
import React from 'react';
import {ExercisesInputs} from '@app/pages/exercises';

type ErrorListProps = {
  field: string;
  errors: FieldErrors<ExercisesInputs>;
}

const ErrorList = ({ field, errors }: ErrorListProps) => {
  if(Object.keys(errors).length === 0) {
    return null;
  }

  return (
    <ul>
      <li>{(errors as any)[field]?.message ?? 'Unknown error'}</li>
    </ul>
  )
}

export default ErrorList;
