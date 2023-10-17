import React from 'react';
import {Pagination, PaginationItem} from '@mui/material';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import DraftService from '../../services/DraftService'


// import { makeStyles } from '@mui/core';
// const useStyles = makeStyles({
//     pagination:{
//         "& .MuiPaginationItem-root.Mui-selected":{
//             color: '#fff',
//             backgroundColor: '#00AEAE'
//         },
//         "& .MuiPaginationItem-root.Mui-selected:hover":{
//             color: '#fff',
//             backgroundColor: '#098080'
//         },
//     },
// })

const PaginationForFind = ({data, changePage, page, stateMeh, setDraft, id_group, limit, prefixUrl}) => {
  // console.log(stateMeh)
  // let array = [];

  // for (let key in stateMeh) {
  //   console.log(key)
  //   if (stateMeh[key] === true) array.push(key)
  // }

  // console.log('Array > ', array)

  // const handleSubmite = async (e) => {
  //   try {
  //     e.preventDefault();
  //     console.log(e)
  //     console.log(page)
  //     const response = await DraftService.fetchDraftToFind(page, array);
  //     setDraft(response)
  //   } catch (error) {
  //   } finally {
  //   }
  // }

  return (
    <div className="flex flex-col items-center justify-center my-12">
      <div className="flex text-gray-700">
        <Pagination count={data} page={page} onChange={changePage} 
          size="large" 
          showFirstButton
          showLastButton
          renderItem={(item) => (

              <PaginationItem 
                component={Link}
                // to={`${fUrl}/${item.page}/${limit}`}
                to = {`/${prefixUrl}/${item.page}`}
                // type='submite'
                {...item}
              />
          )}
        />               
      </div>
    </div>  
  )
}

export default PaginationForFind;

const Button = styled.button`

`;
