import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import Category from './models/Category.js';
import Product from './models/Product.js';

dotenv.config();
connectDB();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Point this at your frontend project's `public` folder.
// Easiest: set FRONTEND_PUBLIC_DIR in your backend's .env, e.g.
//   FRONTEND_PUBLIC_DIR=C:\Users\you\projects\atlas-frontend\public
// or on mac/linux:
//   FRONTEND_PUBLIC_DIR=/Users/you/projects/atlas-frontend/public
// Falls back to a sibling "frontend/public" folder if not set.
const FRONTEND_PUBLIC_DIR =
  process.env.FRONTEND_PUBLIC_DIR || path.join(__dirname, '..', 'frontend', 'public');

const PRODUCTS_UPLOAD_DIR = path.join(__dirname, 'uploads', 'products');
if (!fs.existsSync(PRODUCTS_UPLOAD_DIR)) {
  fs.mkdirSync(PRODUCTS_UPLOAD_DIR, { recursive: true });
}

const slugify = (text) =>
  text.toString().toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const toSpecs = (obj) => Object.entries(obj).map(([key, value]) => ({ key, value: String(value) }));

// Copies a source image (given as a frontend-relative path like "/assets/ourproducts/panel550w.png")
// into backend/uploads/products/, and returns the new "/uploads/products/xxx" path.
// If the source file can't be found, falls back to returning the original frontend-relative path
// so the seed never hard-fails — you'll just see a warning to fix later.
const copyProductImage = (frontendRelativePath, slug) => {
  const sourcePath = path.join(FRONTEND_PUBLIC_DIR, frontendRelativePath);

  if (!fs.existsSync(sourcePath)) {
    console.warn(`  ⚠ Image not found at ${sourcePath} — keeping original path for "${slug}". Set FRONTEND_PUBLIC_DIR correctly and re-seed to fix.`);
    return frontendRelativePath;
  }

  const ext = path.extname(sourcePath);
  const destFilename = `${slug}-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
  const destPath = path.join(PRODUCTS_UPLOAD_DIR, destFilename);

  fs.copyFileSync(sourcePath, destPath);
  return `/uploads/products/${destFilename}`;
};

const PRODUCTS = [
  {
    category: 'Solar Panels',
    name: 'Mono-Crystalline Solar Panel 550W',
    excerpt: 'High-efficiency 550W mono-crystalline solar panel with M10 Half-Cut Cells.',
    description: 'Premium Mono PERC Crystalline module offering industry-leading efficiency of 21.31%. Designed with M10 (144pcs Half Cut) cells and IP68 protection for superior performance in harsh conditions.',
    features: [
      'Maximum power output: 550W',
      'Module efficiency: 21.31%',
      'Cell type: Mono PERC Crystalline - M10 (144pcs Half Cut)',
      'Frame: Anodized Aluminium Alloy',
      'Mechanical Load: 5400 PA (Snow) / 2400 PA (Wind)',
      'Junction Box: Split JB, IP68, 3 By Pass Diodes',
    ],
    specifications: toSpecs({
      power_output: '550W', efficiency: '21.31%', voltage_vmp: '41.93V', current_imp: '13.12A',
      open_circuit_voltage: '49.90V', short_circuit_current: '13.98A',
      dimensions: '2277mm x 1133mm x 40mm', weight: '30Kg', ip_rating: 'IP68',
    }),
    imageSource: '/assets/ourproducts/panel550w.png',
  },
  {
    category: 'Solar Panels',
    name: 'Poly-Crystalline Solar Panel 330W',
    excerpt: 'Durable 330W poly-crystalline solar panel ideal for cost-effective installations.',
    description: 'Reliable and economical solar panel using poly-crystalline cell technology. Best suited for small to medium-scale installations with consistent sunlight exposure.',
    features: [
      'High output: 330W',
      'Durable and cost-effective',
      'Ideal for off-grid applications',
      'UV-resistant EVA layers',
    ],
    specifications: toSpecs({
      power_output: '330W', efficiency: '17.8%', voltage_vmp: '37.2V', current_imp: '8.87A',
      dimensions: '1950mm × 992mm × 35mm', weight: '19kg', ip_rating: 'IP67',
    }),
    imageSource: '/assets/ourproducts/panel330w.png',
  },
  {
    category: 'Inverters',
    name: 'On-Grid Solar Inverter',
    excerpt: 'Smart, Wi-Fi enabled 5kW on-grid inverter with 98.5% efficiency.',
    description: 'Advanced on-grid inverter engineered for residential and commercial solar rooftops. Supports net metering, Wi-Fi monitoring, and three MPPT trackers for maximum energy harvest.',
    features: [
      'Pure sine wave output',
      'Efficiency up to 98.5%',
      'Wi-Fi, RS485, and Modbus communication',
      'Dual/Triple MPPT functionality',
      'Supports net-metering',
    ],
    specifications: toSpecs({
      capacity: '5kW', input_voltage_range: '100V–550V', max_dc_voltage: '600V',
      mppt_trackers: 2, ac_output: '230V (Single Phase)', efficiency_peak: '98.5%',
    }),
    imageSource: '/assets/ourproducts/ong5w.png',
  },
  {
    category: 'Inverters',
    name: 'Hybrid Solar MPPT Inverter 10.2kW',
    excerpt: 'Advanced 10.2kW hybrid inverter with dual output, 160A MPPT, and battery-less operation support.',
    description: 'Next-generation 10.2kW hybrid inverter featuring a Unity Power Factor (1.0) and Dual Output functionality for smart load management. Capable of running without a battery, it includes a built-in anti-dusk kit for harsh environments and supports Wi-Fi/GPRS remote monitoring.',
    features: [
      'Output Power Factor 1.0 (Unity)',
      'Dual Output (Main Load & Second Load)',
      'Inverter can run without battery',
      'Built-in 160A MPPT Solar Charge Controller',
      'High PV input voltage range (90~500VDC)',
      'Built-in anti-dusk kit for harsh environments',
      'Smart battery charger design for optimized battery life',
    ],
    specifications: toSpecs({
      capacity: '10.2kW', pv_input_voltage: '90V–500V DC', battery_voltage: '48V',
      max_charging_current: '160A (Solar) / 140A (AC)', ac_output: '230V (Single Phase)',
      efficiency: '98% (Solar to AC)', dimensions: '537mm x 390mm x 130mm', weight: '11kg',
      communication: 'RS232/WIFI/GPRS',
    }),
    imageSource: '/assets/ourproducts/hybridinverter.png',
  },
  {
    category: 'Lithium-Ion Batteries',
    name: 'LFP Battery 25.6V 310Ah',
    excerpt: '7.9kWh LFP battery with high cycle life and safety protections.',
    description: 'High-capacity Lithium Iron Phosphate (LFP) battery designed for robust performance. Features an 8S configuration with cell balancing and comprehensive protections against over/under voltage and temperature extremes.',
    features: [
      'Cycle Life: >2500 at 100% DOD',
      'Chemistry: LFP (Lithium Iron Phosphate)',
      'Safety Standards: IEC 62133-2:2017/IS 16046-2018',
      'Transportation: UN/DOT 38.3',
      'Protections: Over Voltage, Under Voltage, Short Circuit, Temperature',
    ],
    specifications: toSpecs({
      nominal_voltage: '25.6V', capacity: '310Ah', specific_energy: '7936Wh',
      configuration: '8S', charge_current: '20A (Max 50A)', discharge_current: '40A (Max 80A)',
      dimensions: 'As per Requirement',
    }),
    imageSource: '/assets/ourproducts/lithiumbattery.png',
  },
  {
    category: 'Lithium-Ion Batteries',
    name: 'LFP Battery 25.6V 120Ah',
    excerpt: '3kWh LFP battery optimized for storage reliability.',
    description: 'Compact Lithium Rechargeable Battery with 25.6V nominal voltage and 120Ah capacity. Includes smart cell balancing and high efficiency (>=98%) operation.',
    features: [
      'Cycle Life: >2500 at 100% DOD',
      'Volumetric Energy: 153 Wh/Kg',
      'Charging Mode: CC-CV',
      'Working Temperature: -10°C to 55°C',
      'Output short circuit Protection: Yes',
    ],
    specifications: toSpecs({
      nominal_voltage: '25.6V', capacity: '120Ah', specific_energy: '3072Wh',
      configuration: '8S', charge_current: '20A (Max 50A)', discharge_current: '40A (Max 80A)',
      dimensions: 'As per Requirement',
    }),
    imageSource: '/assets/ourproducts/lithiumbattery.png',
  },
  {
    category: 'Lithium-Ion Batteries',
    name: 'LFP Battery 48V 230Ah',
    excerpt: 'High-power 11kWh LFP battery for demanding applications.',
    description: 'Heavy-duty 48V Lithium Rechargeable Battery offering a massive 11,040Wh specific energy. Ideal for larger systems requiring sustained power delivery and long cycle life.',
    features: [
      'Cycle Life: >2500 at 100% DOD',
      'Specific Energy: 11040 Wh',
      'Volumetric Energy: 158 Wh/Kg',
      'Efficiency: >=98%',
      'Comprehensive BMS protections',
    ],
    specifications: toSpecs({
      nominal_voltage: '48V', capacity: '230Ah', specific_energy: '11040Wh',
      configuration: '15S', charge_current: '20A (Max 50A)', discharge_current: '40A (Max 80A)',
      dimensions: 'As per Requirement',
    }),
    imageSource: '/assets/ourproducts/lithiumbattery.png',
  },
  {
    category: 'Lithium-Ion Batteries',
    name: 'LFP Battery 25.6V 240Ah',
    excerpt: '6.1kWh LFP battery with high volumetric energy density.',
    description: 'Reliable 25.6V Lithium Iron Phosphate battery providing 6144Wh of energy. Engineered with cell balancing and strict safety protocols for diverse energy storage needs.',
    features: [
      'Cycle Life: >2500 at 100% DOD',
      'Specific Energy: 6144 Wh',
      'Volumetric Energy: 163 Wh/Kg',
      'Charging Mode: CC-CV',
      'Humidity Resistance: <90% (Non Condensing)',
    ],
    specifications: toSpecs({
      nominal_voltage: '25.6V', capacity: '240Ah', specific_energy: '6144Wh',
      configuration: '8S', charge_current: '20A (Max 50A)', discharge_current: '40A (Max 80A)',
      dimensions: 'As per Requirement',
    }),
    imageSource: '/assets/ourproducts/lithiumbattery.png',
  },
  {
    category: 'Lithium-Ion Batteries',
    name: 'LFP Battery 25.6V 100Ah',
    excerpt: '3.4kWh LFP battery for efficient energy storage.',
    description: 'Standard 25.6V 100Ah Lithium battery offering 3456Wh specific energy. Perfect for systems requiring a balance of capacity and physical footprint with full safety compliance.',
    features: [
      'Cycle Life: >2500 at 100% DOD',
      'Specific Energy: 3456 Wh',
      'Volumetric Energy: 163 Wh/Kg',
      'Cell Balancing: Yes',
      'Safety: IEC 62133-2:2017/IS 16046-2018',
    ],
    specifications: toSpecs({
      nominal_voltage: '25.6V', capacity: '100Ah', specific_energy: '3456Wh',
      configuration: '8S', charge_current: '20A (Max 50A)', discharge_current: '40A (Max 80A)',
      dimensions: 'As per Requirement',
    }),
    imageSource: '/assets/ourproducts/lithiumbattery.png',
  },
  {
    category: 'Lithium-Ion Batteries',
    name: 'LFP Battery 25.6V 344Ah',
    excerpt: 'High-capacity 8.8kWh LFP battery for maximum endurance.',
    description: 'Top-tier 25.6V battery with 344Ah capacity delivering 8806Wh. Features robust thermal protections and high discharge capability for critical power applications.',
    features: [
      'Cycle Life: >2500 at 100% DOD',
      'Specific Energy: 8806 Wh',
      'Peak Discharge Current: 100A',
      'Over temperature protection: Cut off at 60°C',
      'Standards: UN/DOT 38.3',
    ],
    specifications: toSpecs({
      nominal_voltage: '25.6V', capacity: '344Ah', specific_energy: '8806Wh',
      configuration: '8S', charge_current: '20A (Max 50A)', discharge_current: '40A (Max 80A)',
      dimensions: 'As per Requirement',
    }),
    imageSource: '/assets/ourproducts/lithiumbattery.png',
  },
  {
    category: 'Solar Charge Controllers',
    name: 'MPPT Solar Charge Controller (Solar Series)',
    excerpt: 'IGBT based MPPT controller with wide range input and 7-segment display.',
    description: 'Advanced MPPT Solar Charge Controller incorporated with Microchip and ST DSP Engines. Designed with IGBT technology, it supports wide range MPPT input and multiple battery types including Tubular, SMF, and Lithium.',
    features: [
      'IGBT Based Design with Microchip & ST DSP Engines',
      'Wide Range MPPT Input',
      'Multiple Battery Selection: Tubular (Default), SMF, Lithium',
      '7 Segment Display (Battery Voltage & Current)',
      '5 Stage Charging: Soft Start, Boost, Absorption, Float & Equalize',
      'Comprehensive Protections: Reverse Polarity, Over Current, High Voltage',
    ],
    specifications: toSpecs({
      type: 'MPPT', current: '30A (12/24V) / 60A (48V-420V)',
      voltage_support: '12V, 24V, 48V, 96V, 120V, 180V, 240V, 360V, 420V',
      efficiency: '>95%', display_type: '7 Segment', pv_module_capacity: 'Up to 5000W (depending on system voltage)',
    }),
    imageSource: '/assets/ourproducts/mppt.png',
  },
  {
    category: 'Surge Protection Devices',
    name: 'DC Surge Protection Device',
    excerpt: 'Advanced SPD protecting solar systems from lightning and surges.',
    description: 'Designed to protect DC circuits and solar modules from lightning-induced surges. Complies with IEC standards and built for long-term reliability.',
    features: [
      'Thermal protection',
      'DIN-rail mountable',
      'Visual fault indicator',
      'IEC 61643 compliant',
    ],
    specifications: toSpecs({
      type: 'DC SPD', voltage: '1000V DC', response_time: '<25ns', installation: 'DIN Rail',
    }),
    imageSource: '/assets/ourproducts/spd.png',
  },
  {
    category: 'Mounting Structures',
    name: 'Rooftop Solar Mounting Structure',
    excerpt: 'Heavy-duty corrosion-resistant rooftop solar mounting system.',
    description: 'Hot-dipped galvanized mounting structure suitable for residential and commercial rooftops. Designed for 25+ years durability.',
    features: [
      'Galvanized steel (80 micron)',
      'Wind resistance up to 240 km/h',
      'Compatible with all panel sizes',
      'Adjustable tilt angles',
    ],
    specifications: toSpecs({
      material: 'HDG Steel', coating: '80-micron zinc', tilt_range: '10°–35°', wind_load: '240 km/h',
    }),
    imageSource: '/assets/ourproducts/solar-mounting-structure.avif',
  },
  {
    category: 'Grid-Tie Inverters',
    name: '3kW Grid-Tie Inverter',
    excerpt: 'High-performance grid-tie inverter for residential rooftops.',
    description: 'Connects solar power directly to the grid with advanced MPPT technology and remote monitoring capability. Ideal for net-metering installations.',
    features: [
      '98% conversion efficiency',
      'Wi-Fi enabled',
      'Real-time monitoring',
      'Dual MPPT inputs',
    ],
    specifications: toSpecs({
      capacity: '3kW', mppt_trackers: 2, ac_output: '230V', efficiency: '98%',
    }),
    imageSource: '/assets/ourproducts/3gridtieinverter.jpeg',
  },
];

const seedProducts = async () => {
  try {
    console.log(`Looking for source images in: ${FRONTEND_PUBLIC_DIR}`);

    // 1. Ensure all categories referenced above exist
    const categoryNames = [...new Set(PRODUCTS.map((p) => p.category))];
    const categoryMap = {};

    for (let i = 0; i < categoryNames.length; i++) {
      const name = categoryNames[i];
      let cat = await Category.findOne({ name });
      if (!cat) {
        const existingCount = await Category.countDocuments();
        cat = await Category.create({
          name,
          slug: slugify(name),
          order: existingCount,
          isActive: true,
        });
        console.log('Created category:', cat.name);
      }
      categoryMap[name] = cat._id;
    }

    // 2. Upsert each product (by slug), copying its image into uploads/products/
    let created = 0;
    let skipped = 0;

    for (let i = 0; i < PRODUCTS.length; i++) {
      const p = PRODUCTS[i];
      const slug = slugify(p.name);
      const exists = await Product.findOne({ slug });
      if (exists) {
        skipped++;
        continue;
      }

      const imagePath = copyProductImage(p.imageSource, slug);

      await Product.create({
        name: p.name,
        slug,
        category: categoryMap[p.category],
        excerpt: p.excerpt,
        description: p.description,
        features: p.features,
        specifications: p.specifications,
        images: [imagePath],
        isActive: true,
        order: i,
      });
      created++;
      console.log(`  ✔ Seeded: ${p.name}`);
    }

    console.log(`\nSeed complete: ${created} products created, ${skipped} already existed.`);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedProducts();