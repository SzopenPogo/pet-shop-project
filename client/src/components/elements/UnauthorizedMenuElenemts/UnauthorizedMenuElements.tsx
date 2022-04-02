import { LOGIN_ROUTE, REGISTER_ROUTE } from "../../../constants/routes"
import MainLink from "../../links/MainLink/MainLink"
import SecondaryLink from "../../links/SecondaryLink/SecondaryLink"

const UnauthorizedMenuElement = () => {
  return (
    <>
      <MainLink title='Sign in' route={LOGIN_ROUTE} />
      <SecondaryLink title='Register' route={REGISTER_ROUTE} />
    </>
  )
}

export default UnauthorizedMenuElement