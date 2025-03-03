import { useState } from "react";
import ListFilter from "./ListFilter";
const ListFilterParent = () => {
  const [query, setQuery] = useState("");
  const items = ["Apple", "Banana", "Orange", "Grape"];
  return (<div><input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" />
    <ListFilter items={items} query={query} /></div>);
};
export default ListFilterParent
