export default function reducer(state,action){
    switch (action.type) {
        case "Current_User":
            return{...state,user:action.payload};
            
        case "Get_All_Contacts":
            return{...state,contacts:action.payload};

        case "Create_One_Contact":
            return{...state,contacts:[...state.contacts,action.payload]};
        case "Update_One_Contact":
            return{...state,
            contacts: state.contacts.map((contact) =>
            contact._id === action.payload._id ? {...contact,...action.payload} : contact
            ),
        };    
        case "Delete_One_Contact":
            return{
                ...state,contacts: state.contacts.filter((contact)=> contact._id !==action.payload._id),
            };
        default:
            return state;
    }
}