const Orders = () => {
  return (
    <div className="orders">
      <header>
        <h1>Orders</h1>
      </header>
      <main className="order-list">
        <div className="order">
          <div className="shop-info">
            <img
              className="profile-photo"
              src="https://picsum.photos/30"
              alt="asd"
            />
            <h3 className="name">Ricky Roll</h3>
            <p className="contact">+0912398745</p>
          </div>
          <div className="items">
            <div className="item">
              <img src="http://picsum.photos/43" />
              <p className="name"> Coke Kasalo</p>
              <p className="pq">P15.00x2pcs</p>
              <p className="amount">30.00</p>
            </div>
            <div className="item">
              <img src="http://picsum.photos/40" />
              <p className="name"> Coke Kasalo</p>
              <p className="pq">P15.00x2pcs</p>
              <p className="amount">30.00</p>
            </div>
          </div>
          <h2 className="total-amount">P180.00</h2>
        </div>
        <div className="order">
          <div className="shop-info">
            <img
              className="profile-photo"
              src="https://picsum.photos/50"
              alt="asd"
            />
            <h3 className="name">Ricky Roll</h3>
            <p className="contact">+12365498</p>
          </div>
          <div className="items">
            <div className="item">
              <img src="http://picsum.photos/60" />
              <p className="name"> Coke Kasalo</p>
              <p className="pq">P15.00x2pcs</p>
              <p className="amount">30.00</p>
            </div>
            <div className="item">
              <img src="http://picsum.photos/70" />
              <p className="name"> Coke Kasalo</p>
              <p className="pq">P15.00x2pcs</p>
              <p className="amount">30.00</p>
            </div>
          </div>
          <h2 className="total-amount">P180.00</h2>
        </div>
      </main>
    </div>
  );
};

export default Orders;
