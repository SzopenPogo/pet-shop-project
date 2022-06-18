import classes from './SubcategoryListItem.module.scss'
import { SUBCATEGORY_ROUTE } from '../../../constants/routes'
import { ISubcategory } from '../../../interfaces/ISubcategory'
import NavbarDesktopLink from '../../links/NavbarDesktopLink/NavbarDesktopLink'

const SubcategoryListItem = ({title, imageUrl, _id}: ISubcategory) => {
  return (
    <li className={classes['subcategory-item']} >
      <NavbarDesktopLink
        title={title}
        route={`${SUBCATEGORY_ROUTE}/${_id}`}
        image={imageUrl}
      />
    </li>
  )
}

export default SubcategoryListItem