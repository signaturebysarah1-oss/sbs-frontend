import { CreateCartPayload } from "@/types/website";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface GuestCartStore {

  items: CreateCartPayload[];

  addItem: (
    item: CreateCartPayload
  ) => void;

  removeItem: (
    index:number
  ) => void;

  clearCart: () => void;
}



export const useGuestCart =
create<GuestCartStore>()(
persist(
(set)=>({

items:[],


addItem:(item)=>

set((state)=>({

items:[
...state.items,
item
]

})),


removeItem:(index)=>

set((state)=>({

items:
state.items.filter(
(_,i)=>i !== index
)

})),


clearCart:()=>set({
items:[]
})


}),
{
name:"sbs-guest-cart"
}
)
);