import Header from "../components/Header";
import RecipeCards from "../components/RecipeCards";


export default function RecipePage() {
    return(
        <div className="tw-w-[96vw]">
            <Header/>
            <ul className="tw-grid tw-grid-cols sm:tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 tw-gap-5 tw-mt-8">
                <RecipeCards/>
                <RecipeCards/>
                <RecipeCards/>
                <RecipeCards/>
                <RecipeCards/>
                <RecipeCards/>
            </ul>
        </div>
    )
}