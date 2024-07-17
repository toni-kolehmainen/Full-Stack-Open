import { useContext, useEffect, useRef, useState } from "react";
import { useGetStoresMutation } from "../../../services/api";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button, Spinner } from "react-bootstrap";
import { StoreContext } from "../../../redux/context/StoreContext";


function Scroll(props) {
  const divRef = useRef(null);
  const [data, setData] = useState([])
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0)
  const [limit, setLimit] = useState(24)
  const {storeId, handleChange} = useContext(StoreContext);
  const [
    getStores, // This is the mutation trigger
    { isLoading: isUpdating }, // This is the destructured mutation result
  ] = useGetStoresMutation()

  const handleHasmore = (resData) => {
    if (resData.length < limit) {
      setHasMore(false)
    } else {
      setHasMore(true)
    }
  }

  useEffect(() => {
    async function fetchData() {
      const filters = props.brands.map(({ brand, checked }) =>
        checked ? ({ brand }) : null).filter(brand => brand)
      const response = await getStores({ brand: filters, skip: 0, limit, search: props.searchText });
      handleHasmore(response.data)
      setData(response.data)
      setSkip(24)
    }
    fetchData();
  }, [])

  useEffect(() => {
    divRef.current.scroll({
      top: 0,
      behavior: "auto"
    });
    async function fetchData() {
      const filters = props.brands.map(({ brand, checked }) =>
        checked ? ({ brand }) : null).filter(brand => brand)
      const response = await getStores({ brand: filters, skip: 0, limit, search: props.searchText });
      handleHasmore(response.data)
      setData(response.data)
      setSkip(24);
    }
    fetchData();
  }, [props.brands, props.searchText])

  const reFetchData = () => {
    console.log("reFetchData")
    const filters = props.brands.map(({ brand, checked }) =>
      checked ? ({ brand }) : null).filter(brand => brand)
    getStores({ brand: filters, skip, limit, search: props.searchText }).then(
      (response) => {
        handleHasmore(response.data)
        setData((data) => [...data, ...response.data])
        setSkip((skip) => skip + 24);
      }
    )
  }
  const handleStoreChange = (value) => {
    // console.log(value)
    handleChange(value)
  }
  return (
    <div
      id="scrollableDiv"
      style={{ "display": "flex", "flexDirection": "column", overflowY: "scroll", height: "70vh", "scrollbarColor": "#495057 #bada5500" }}
      ref={divRef}>
      <div>
        Haulla löytyi:
      </div>
      {(!isUpdating && !data) && (
        <Spinner animation="border" variant="secondary" />
      )}
      <div>
        <InfiniteScroll
          dataLength={data.length}
          next={reFetchData}
          hasMore={hasMore}
          useWindow={false}
          scrollableTarget="scrollableDiv"
          loader={<p>Loading...</p>}
          endMessage={<p style={{ textAlign: "center" }}>No more data to load.</p>}
        >
          {data.map((store) => (
            <div key={store.id} className="bg-transparent rounded-2 shadow-5-strong p-4 border border-1" style={{ "display": "grid" }}>
              <div className="modal-title">
                {store.name}
              </div>
              <div className="row">
                <div className="col-9">
                  <div className="row row-cols-auto">
                    <div className="col">
                      {(store.weeklyOpeningHours[0].dates && store.weeklyOpeningHours[0].dates[0].mode === 'RANGE')  ? store.weeklyOpeningHours[0].dates[0].open + "-" + store.weeklyOpeningHours[0].dates[0].close : null}
                      {(store.weeklyOpeningHours[0].dates && store.weeklyOpeningHours[0].dates[0].mode === 'ALL_DAY')  ? '24h' : null}
                    </div>
                    <div className="col">
                      {store.location.postcodeName}
                    </div>
                    <div className="col">
                      <a className="link-primary" href={store.slug}>Tarkista aukioloajat</a>
                    </div>
                  </div>
                </div>
                <div className="col-3" style={{ "textAlign": "end" }}>
                  <Button variant={store.id === storeId ? "primary" : "outline-primary"}
                    onClick={() => handleStoreChange(store.id)}>
                    {store.id === storeId ? "Katso tuotteita" : "Valitse kauppa"}
                  </Button>
                </div>
              </div>
            </div>))}
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default Scroll