import CheckoutAddressesList from '../../lists/CheckoutAddressesList/CheckoutAddressesList';
import MainModal from '../MainModal/MainModal';

interface IProps {
  isAddressModal: boolean;
  close: () => void
}

const AddressesModal = ({
  isAddressModal,
  close
}: IProps) => {
  return (
    <MainModal
      activate={isAddressModal}
      timeout={150}
      title={'Addresses'}
      closeFunction={close}
    >
      <CheckoutAddressesList
        close={close}
      />
    </MainModal>
  )
}

export default AddressesModal;