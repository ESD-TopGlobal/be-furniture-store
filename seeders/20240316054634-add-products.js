'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Products', [
      {
        "name": "Heim Studio HAKI Meja Makan 160",
        "desc": "Haki Meja Makan 160 merupakan salah satu produk meja makan minimalis dengan desain Japandi Natural yang Elegan dan Fungsional.",
        "category": "Meja Makan",
        "price": 1749000,
        "stock": 50,
        "image": "/images/1707815867839-Heim-Studio-HAKI-Meja-Makan-160.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "name": "Heim Studio BORDO Sofa 2 Seater",
        "desc": "Bordo Sofa 2 Seater adalah pilihan yang tepat bagi Anda yang mencari kursi sofa minimalis dan murah untuk ruang tamu atau keluarga Anda.",
        "category": "Sofa",
        "price": 3469000,
        "stock": 20,
        "image": "/images/1707816445398-Heim-Studio-BORDO-Sofa-2-Seater.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "name": "Yuzu Sofa 2 Dudukan",
        "desc": "Yuzu Sofa 2 Dudukan merupakan produk sofa minimalis yang memberikan kenyaman dan keempukan dengan desain Japandi. Produk ini menjadi pilihan yang tepat untuk Anda yang sedang mencari sofa minimalis murah dengan keempukan dudukan soft yang nyaman.",
        "category": "Sofa",
        "price": 2229000,
        "stock": 20,
        "image": "/images/1707816143676-YUZU-Sofa-2-Dudukan.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "name": "Meja Makan Keluarga + Kursi",
        "desc": "meja makan yang dilengkapi dengan kursi, dan memiliki desgin minimalis. Tidak memakan tempat dan cocok untuk semua kalangan",
        "category": "MEJA & KURSI",
        "price": 1100000,
        "stock": 29,
        "image": "/images/1707932642029-Meja-Makan-Keluarga-+-Kursi.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "name": "Kasur Tidur Anti Pegal",
        "desc": "kasur yang menghadirkan kualitas tidur terbaik bagi Anda. Dirancang dengan cermat dan menggunakan bahan-bahan terbaik, kasur ini akan membawa kenyamanan istirahat Anda ke tingkat yang baru.",
        "category": "KASUR",
        "price": 2000000,
        "stock": 10,
        "image": "/images/1707932879373-Kasur-Tidur-Anti-Pegal.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
