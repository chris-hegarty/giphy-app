import { FavoritesContext } from "../../src/context/FavoritesContext";

describe("FavoritesContext", () => {
    beforeEach(() => {
        //fill state with dummy data and this will affect all others.
    })
    describe("Add Function", () => {
        it("Should add a favorite", () => {

        })
        it("Should add a provided favorite", () => {

        })
        it("Should not change other favorites on add", () => {

        })

    });
    describe("Remove Function", () => {
        it("Should remove a favorite", () => {

        })
        it("Should remove favorite with provided ID", () => {

        })
        it("Should not impact other favorites on remove", () => {

        })




    });



})











// - `FavoritesContext`
//     - `add` function, does it actually add a favorite
//         - `add` function, does it ONLY add the one we want
//             - `add` function, does it leave the others the way they are
//                 - `remove` function, does it remove a favorite
//                     - `remove` function, does it remove the CORRECT favorite
//                         - `remove` function, does it leave all the others in tact