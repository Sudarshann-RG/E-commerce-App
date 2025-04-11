import React from "react";

const ItemsPage = () => {
    const [items, setItems] = useState([]);
  
    useEffect(() => {
      fetch("/api/Items")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setItems(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, []);
    return (
        <div>
          <nav>
            <div>Contoso</div>
          </nav>
          <div>
            <div>
              <div>Items</div>
            </div>
          </div>
          <div>
            <div>
              <div>Item List</div>
              <div>
                {items.map((item) => (
                  <div key={item.id}>
                    <div>{item.id} - {item.title} - ${item.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default ItemsPage;