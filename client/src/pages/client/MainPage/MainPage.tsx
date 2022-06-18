import MainPageCategoryContainer from "../../../components/containers/MainPageCategoryContainer/MainPageCategoryContainer";
import MainPageProductContainer from "../../../components/containers/MainPageProductContainer/MainPageProductContainer";
import MainLayout from "../../../components/layout/MainLayout/MainLayout";
import MainSlider from "../../../components/Sliders/MainSlider/MainSlider";

const MainPage = () => {
  

  return (
    <MainLayout>
      <>
        <MainSlider />
        <MainPageProductContainer />
        <MainPageCategoryContainer />
      </>
    </MainLayout>
  )
}

export default MainPage