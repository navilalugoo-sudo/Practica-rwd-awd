const express = require('express');
const useragent = require('express-useragent');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración correcta de vistas y archivos estáticos
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para detectar el tipo de dispositivo
app.use(useragent.express());

const generateProducts = () => {
  const hardwareModels = [
    { title: 'Servidor Rack Enterprise v1', cpu: 'Intel Xeon Gold 6330 (28 cores)', ram: '128 GB DDR4 ECC', storage: '2x 1.92TB NVMe SSD', psu: 'Redundant 800W', image: 'servidor1.jpg' },
    { title: 'Estación de Trabajo Pro X', cpu: 'AMD Ryzen Threadripper 3960X', ram: '64 GB DDR4', storage: '1TB NVMe M.2 SSD', psu: '750W 80+ Gold', image: 'workstation1.jpg' },
    { title: 'Laptop Gamer MSI Katana', cpu: 'Intel Core i7-12650H', ram: '16 GB DDR5', storage: '512GB NVMe SSD', psu: 'Adaptador 240W', image: 'laptop1.jpg' },
    { title: 'Servidor Torre PowerEdge', cpu: 'Intel Xeon E-2334', ram: '32 GB ECC UDIMM', storage: '2x 4TB SATA HDD', psu: '450W Dual Hot-Plug', image: 'servidor2.jpg' },
    { title: 'PC Escritorio Oficina Business', cpu: 'Intel Core i5-11400', ram: '16 GB DDR4', storage: '512GB SSD SATA', psu: '500W Standard', image: 'pc1.jpg' },
    { title: 'Servidor Blade Modular C6420', cpu: 'Dual Intel Xeon Platinum 8280', ram: '256 GB DDR4 ECC', storage: '4x 960GB SAS SSD', psu: '1400W Titanium', image: 'servidor3.jpg' },
    { title: 'Workstation Gráfica Creator Z', cpu: 'AMD Ryzen 9 7950X', ram: '128 GB DDR5', storage: '2TB NVMe Gen4 SSD', psu: '850W Fully Modular', image: 'workstation2.jpg' },
    { title: 'Laptop Lenovo LOQ 15', cpu: 'AMD Ryzen 5 7430U', ram: '16 GB LPDDR5', storage: '512GB SSD', psu: '170W Slim Adapter', image: 'laptop2.jpg' },
    { title: 'Servidor de Almacenamiento NAS', cpu: 'Intel Atom C3558 (4 cores)', ram: '16 GB DDR4 ECC', storage: '4x 8TB NAS HDD', psu: '250W Redundante', image: 'nas1.jpg' },
    { title: 'Mini PC de Escritorio NUC', cpu: 'Intel Core i7-1165G7', ram: '32 GB DDR4', storage: '1TB NVMe SSD', psu: '120W AC Adapter', image: 'minipc1.jpg' },
    { title: 'Servidor de Computo HPC', cpu: 'AMD EPYC 7763 (64 cores)', ram: '512 GB DDR4 ECC', storage: '8x 3.84TB NVMe SSD', psu: '2000W 80+ Titanium', image: 'servidor4.jpg' },
  
  ];

  return hardwareModels.map((item, index) => ({
    id: index + 1,
    title: item.title,
    specs: {
      cpu: item.cpu,
      ram: item.ram,
      storage: item.storage,
      psu: item.psu
    },
    price: `$${(850 + (index * 250)).toLocaleString()}`,
    image: item.image // Asigna la imagen correspondiente
  }));
};
// Ruta RWD (Responsive Web Design)
app.get('/responsive', (req, res) => {
  res.render('responsive', { products: generateProducts() });
});

// Ruta AWD (Adaptive Web Design)
app.get('/adaptive', (req, res) => {
  const products = generateProducts();
  
  if (req.useragent.isMobile) {
    res.render('adaptativo-movil', { products });
  } else {
    res.render('adaptativo', { products });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});