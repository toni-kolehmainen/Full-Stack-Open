import { useContext, useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { ThemeContext } from "../../../redux/context/ThemeContext";
import { useGetProductGroupsQuery } from "../../../services/api";

function Children({ obj }) {
  if (!('children' in obj)) {
    return;
  }
  return (
    obj.children.map(child => (
      <a key={child.id} style={{ "display": "block", "fontWeight": "350" }}>
        {child.name}
      </a>
    )
    )
  )
}

function Groups() {
  const { themeDark } = useContext(ThemeContext);
  const [childPath, setChildPath] = useState(null)
  const [hoverOff, setHoverOff] = useState(false)

  const groupClicked = (index) => {
    setHoverOff(true)
    setChildPath(index)
  }
  const groupHover = (index) => {
    if (!hoverOff) {
      setChildPath(index)
    }
  }
  const {
    data: path,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetProductGroupsQuery()

  // console.log(path)
  const variant = themeDark ? "light" : "dark"
  return (
    <>
      <ul className={`p-0 bg-${variant}`}
      style={{ "minWidth": "30vh", "display": "inline-block", "listStyleType": "none", "backgroundColor": "white",
      "height": "100%", "verticalAlign": "top", "overflowY": "scroll", "overflowX": "hidden"}}>
        {!isLoading ? 
        path.navigation.map((group, index) =>
        (<li className="" style={{ "textAlign": "center" }} key={group.id}>
          <Button
            onClick={() => groupClicked(index)}
            onMouseEnter={() => groupHover(index)}
            variant={variant}
            style={{"display": "block", "width": "100%", "borderLeftStyle":(index === childPath && hoverOff) ? "solid":"none", "borderLeftColor":"#32BF6F", "borderLeftWidth":"4px"}}>
            {group.name}
          </Button>
        </li>)
        ): <div>Loading</div>}
      </ul>
      <div className="group" style={{ "display": "flex", "overflowY": "auto", "flexGrow": "1", "padding": "8" }}>
        <div style={{ "display": "flex", "flex": "1", "alignItems": "flex-start", "position": "relative" }}>
          <div
            style={{ "display": "block", "columns": "250px", "width": "100%" }}>
            {(childPath !== null && !isLoading) ?
              path.navigation[childPath].children.map((child, index) =>
              (
                <div className="" style={{ "display": "block", "breakInside": "avoid-column" }} key={child.id}>
                  <a key={child.id} style={{ "display": "block", "fontWeight": "500" }}>{child.name}</a>
                  <Children obj={child} />
                </div>
              )
              )
              : null}
          </div>
        </div>
      </div>
    </>
  )
}
export default Groups