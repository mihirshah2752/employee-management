export const NO_DATA_TEXT: string = "No Data Found";
export const LOADING_TEXT: string = "Loading...";
export const UPDATE_TEXT: string = "Update";
export const DELETE_TEXT: string = "Delete";
export const TABLE_COLUMNS: string[] = [
  "ID",
  "Name",
  "Position",
  "Contact",
  "Department",
  "Action",
];
export const ACTIONS: any = [
  {
    className: "btn-primary",
    child: UPDATE_TEXT,
  },
  {
    className: "btn-secondary lg:ml-2 md:ml-0 md:mt-2",
    child: DELETE_TEXT,
  },
];
