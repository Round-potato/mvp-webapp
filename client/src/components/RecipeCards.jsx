import React from "react";

export default function RecipeCards() {
    return (
            <li>
                <div className="tw-bg-white tw-rounded-xl tw-h-full tw-flex tw-flex-col tw-justify-between tw-shadow tw-border-none">
                    <a>
                        <div className="tw-flex tw-flex-col tw-space-y-1.5 tw-p-5">
                            <div className="tw-w-full tw-relative tw-aspect-square">
                                <img alt="recipe image" loading="lazy"  decoding="async" srcSet="https://food.fnr.sndimg.com/content/dam/images/food/fullset/2016/6/12/3/FNM070116_Penne-with-Vodka-Sauce-and-Mini-Meatballs-recipe_s4x3.jpg.rend.hgtvcom.1280.1280.suffix/1465939620872.jpeg" className="tw-rounded-xl tw-object-cover tw-w-full tw-h-full" />
                            </div>
                            <div className="tw-p-6 tw-pt-0 tw-relative">
                                <h3 className="tw-font-semibold tw-leading-none tw-tracking-tight group-hover:tw-underline">
                                    Penne Pasta with Vodka Sauce
                                </h3>
                                <p className="tw-text-sm text-gray-500">
                                    A classic Italian dish with a rich and creamy sauce. Easy to make and delicious to eat
                                </p>

                            </div>
                        </div>
                    </a>
                    <div className="tw-flex tw-items-center tw-p-6 tw-pt-6">
                        <a className="tw-flex tw-gap-x-2 tw-items-center hover:tw-underline bg-white tw-p-2 tw-rounded-lg">
                            <div>

                            </div>
                        </a>
                    </div>

                </div>
            </li>

    )
}