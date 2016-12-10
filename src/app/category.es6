import categories from '../api/category';
console.log(categories);

let React = require('react'),
    ReactDOM = require('react-dom');

// 商品栏整体
let CategoryBox = React.createClass({
    render: function() {
        return (
            <div className="category-box">
                <SearchBox />
                <Products products={this.props.products}/>
            </div>
        )
    }
});

// 搜索栏
let SearchBox = React.createClass({
    render: function() {
        return (
            <div className="search-box">
                <div className="search-controle">
                    <input type="text" value=""
                    placeholder="Search...."
                    />
                </div>
                <div className="check-box">
                    <input type="checkBox" />
                    Only show products in stock
                </div>
            </div>
        )
    }
});

// 产品栏
let ProductCategoryRow = React.createClass({
    render: function() {
        return (
            <tr>
                <td colSpan="2" className="product-row">{this.props.category}</td>
            </tr>
        );
    }
});

// 产品列表
let ProductRow = React.createClass({
    render: function() {
        let name = this.props.product.stocked ? 
            this.props.product.name : 
            <span style={{color: 'red'}}>
                {this.props.product.name}
            </span>;

        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        )
    }
})

// 产品表格
let Products = React.createClass({
    render: function() {
        let rows = [];
        let lastCategory = null;
        console.log(this.props.products);
        this.props.products.forEach((product) => {
            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category} />)
            }
            rows.push(<ProductRow product={product} key={product.name} />);
            lastCategory = product.category;
        });
        return(
            <table className="table">
                <thead>
                    <tr>
                        <th>Name:</th>
                        <th>Price:</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        )
    }
})

ReactDOM.render(
    <CategoryBox products={categories}/>,
    document.getElementById('main')
)
