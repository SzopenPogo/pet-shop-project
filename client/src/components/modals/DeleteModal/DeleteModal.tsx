import React from 'react'
import MainButton from '../../buttons/MainButton/MainButton';
import MainModal from '../MainModal/MainModal'

interface IProps {
  isDeleteWindow: boolean;
  title: string;
  _id: string;
  deleteHandler: () => void;
  closeWindow: () => void;
}

const DeleteModal = ({
  isDeleteWindow,
  title,
  _id,
  closeWindow,
  deleteHandler
}: IProps) => {
  return (
    <MainModal 
        activate={isDeleteWindow}
        timeout={300}
        title={`Delete "${title}"`}
        closeFunction={closeWindow}
      >
        <>
          <h2 style={{margin: '.5rem 0'}}>
            Are you sure you want to delete {title}?
          </h2>
          <span style={{marginBottom: '1rem'}}>ID: {_id}</span>
          <MainButton
            isSubmit={false}
            title='Delete'
            onClick={deleteHandler}
          />
        </>
      </MainModal>
  )
}

export default DeleteModal