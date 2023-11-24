import Sequelize, { Model } from 'sequelize'

class Product extends Model {
  static init (sequelize) {
    super.init({

      name: Sequelize.STRING,
      price: Sequelize.INTEGER,
      category: Sequelize.STRING,
      path: Sequelize.STRING,
      url: {
        type: sequelize.VIRTUAL,
        get () {
          return `http://localhost:3000/product-file/${this.pach}`
        }

      }
    },
    {
      sequelize
    }
    )
  }
}

export default new Product()
