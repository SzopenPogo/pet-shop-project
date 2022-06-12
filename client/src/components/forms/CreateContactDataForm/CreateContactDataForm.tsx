import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import classes from './CreateContactDataForm.module.scss';
import { CSSTransition } from 'react-transition-group';
import { FormEvent, useRef } from 'react';
import CloseButton from '../../buttons/CloseButton/CloseButton';
import MainButton from '../../buttons/MainButton/MainButton';
import NumberInput from '../../inputs/NumberInput/NumberInput';
import { validatePhoneNumber } from '../../../utils/validation/validatePhoneNumber';
import TextInput from '../../inputs/TextInput/TextInput';
import { adminCreateContact } from '../../../store/contact/actions/contact-create-actions';
import { addInfoMessage } from '../../../store/ui/actions/info-items-actions';

interface IProps {
  activate: boolean;
  timeout: number;
  toggleForm: () => void;
}

const CreateContactDataForm = ({ activate, timeout, toggleForm }: IProps) => {
  const dispatch = useDispatch();

  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const postalCodeRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const streetRef = useRef<HTMLInputElement>(null);
  const homeNumberRef = useRef<HTMLInputElement>(null);
  const bankNumberRef = useRef<HTMLInputElement>(null);

  const token = useSelector((state: RootState) => state.user.token);

  const createContactHandler = (event: FormEvent) => {
    event.preventDefault();

    const phoneNumberValue = phoneNumberRef.current!.value;
    const countryValue = countryRef.current!.value;
    const postalCodeValue = postalCodeRef.current!.value;
    const cityValue = cityRef.current!.value;
    const streetValue = streetRef.current!.value;
    const homeNumberValue = homeNumberRef.current!.value;
    const bankNumberValue = bankNumberRef.current!.value;

    dispatch(adminCreateContact(token, {
      bankNumber: bankNumberValue,
      city: cityValue,
      country: countryValue,
      homeNumber: homeNumberValue,
      phoneNumber: +phoneNumberValue,
      postalCode: postalCodeValue,
      street: streetValue
    }));

    dispatch(addInfoMessage({
      message: 'Contact created',
      isPositive: true,
      timeout: 1500
    }));

    toggleForm();
  }

  const nodeRef = useRef(null);
  return (
    <CSSTransition
        nodeRef={nodeRef}
        in={activate}
        timeout={timeout}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: classes['enter'],
          enterActive: classes['enter-active'],
          exit: classes['exit'],
          exitActive: classes['exit-active']
        }}
      >
      <form 
        ref={nodeRef}
        className={classes['create-contact']}
        onSubmit={createContactHandler}
      >
        <h1>Create new contact:</h1>
        
        <NumberInput
          ref={phoneNumberRef}
          title={'Phone number'}
          isReadonly={false}
          isRequired={true}
          isLabel={true}
          value={0}
          validateInput={validatePhoneNumber}
        />

        <TextInput
          ref={countryRef}
          title={'Country'}
          isReadonly={false}
          isRequired={true}
          isLabel={true}
          value={''}
          inputMinValueLenght={2}
        />

        <TextInput
          ref={postalCodeRef}
          title={'Postal Code'}
          isReadonly={false}
          isRequired={true}
          isLabel={true}
          value={''}
          inputMinValueLenght={3}
        />

        <TextInput
          ref={cityRef}
          title={'City'}
          isReadonly={false}
          isRequired={true}
          isLabel={true}
          value={''}
          inputMinValueLenght={2}
        />

        <TextInput
          ref={streetRef}
          title={'Street'}
          isReadonly={false}
          isRequired={true}
          isLabel={true}
          value={''}
          inputMinValueLenght={2}
        />

        <TextInput
          ref={homeNumberRef}
          title={'Home Number'}
          isReadonly={false}
          isRequired={true}
          isLabel={true}
          value={''}
          inputMinValueLenght={2}
        />

        <TextInput
          ref={bankNumberRef}
          title={'Bank Number'}
          isReadonly={false}
          isRequired={true}
          isLabel={true}
          value={''}
          inputMinValueLenght={2}
        />

        <div className={classes['submit-button-container']}>
          <MainButton
            isSubmit={true}
            title='Create'
          />
        </div>

        <div className={classes['close-button-container']}>
          <CloseButton onClick={toggleForm} />
        </div>
      </form>
    </CSSTransition>
  )
}

export default CreateContactDataForm