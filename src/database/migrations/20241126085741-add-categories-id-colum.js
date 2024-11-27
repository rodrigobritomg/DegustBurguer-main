/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("products", "category_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "categories",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("products", "category_id");
  },
};

// fazendo relacionamento de tabelas - indo na tabela de produtos na coluna category_id e criando
// apos coluna criada o tipo e refencia onde?
//liga com model categories usa seu id pra relacionar
//quando fizer updade muda em cascata e delet mantem null