import { NextPage } from 'next'
import React from 'react'
import {useSession} from '@app/store/useSession';
import {selectUser} from '@app/store/selectors/session';

const IndexView: NextPage = () => {
  const user = useSession(selectUser);
  console.log('user', user);
  return (
    <h1>Index View</h1>
  );
}

export default IndexView
