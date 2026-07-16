import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Blog from '../models/Blog.js';

dotenv.config();

const blogs = [
  {
    title: "Solar Energy is Powerful",
    slug: "solar-energy-is-powerful",
    date: "2025-11-10",
    author: "Priya Sharma",
    category: "Solar Energy",
    mainImage: "/assets/blogs/post-1.jpg",
    excerpt: "Discover the immense power of solar energy and how it's transforming our world. From residential rooftops to large-scale farms, the sun provides a clean, inexhaustible power source...",
    contentHtml: "<p>The potential of solar energy is truly staggering. Every hour, the sun beams onto Earth more than enough energy to satisfy global energy needs for an entire year. Capturing even a fraction of this power can lead to significant environmental and economic benefits. <br></p><h3 class=\"text-3xl font-bold my-6\">Harnessing the Sun's Power</h3><p>Modern solar panels, or photovoltaic (PV) modules, are more efficient than ever. They convert sunlight directly into electricity, which can be used to power homes, businesses, and even entire cities. This technology has matured rapidly, becoming one of the most affordable sources of new electricity generation.</p><blockquote class=\"my-8 p-6 bg-green-900 text-white rounded-lg text-2xl italic font-semibold text-center\">\u201cThe sun is a daily reminder that we too can rise again from the darkness, that we too can shine our own light.\u201d</blockquote><p>As we move away from fossil fuels, solar energy stands out as a key player in the clean energy transition. It reduces greenhouse gas emissions, improves air quality, and creates jobs in manufacturing, installation, and maintenance. <br><strong></strong> (We must adopt clean energy.)</p><h3 class=\"text-3xl font-bold my-6\">Why Solar is the Solution</h3><ul class=\"list-none space-y-2 my-4\"><li class=\"flex items-center\"><span class=\"text-green-500 mr-2\">&#10003;</span> Reduces electricity bills significantly.</li><li class=\"flex items-center\"><span class=\"text-green-500 mr-2\">&#10003;</span> Low maintenance costs and long lifespan (25+ years).</li><li class=\"flex items-center\"><span class=\"text-green-500 mr-2\">&#10003;</span> Provides energy independence and reliability.</li></ul><p>Investing in solar is not just an environmental choice; it's a smart financial decision. The technology is reliable, the fuel is free, and the benefits are long-lasting.</p>",
  },
  {
    title: "The Future of Solar Inspection",
    slug: "future-of-solar-inspection",
    date: "2025-11-11",
    author: "Rohan Kumar",
    category: "Technology",
    mainImage: "/assets/blogs/post-2.jpg",
    excerpt: "Technology is revolutionizing solar panel inspection. Drones and thermal imaging are making the process faster, safer, and more accurate than ever before...",
    contentHtml: "<p>Gone are the days of manually inspecting each solar panel on a vast solar farm. Today, technology is leading the charge, making solar inspection more efficient and effective. <br></p><h3 class=\"text-3xl font-bold my-6\">Drones and Thermal Imaging</h3><p>The biggest game-changers are drones (UAVs) equipped with high-resolution thermal imaging cameras. A drone can fly over an entire solar installation in a fraction of the time it would take a human technician. The thermal camera can instantly spot 'hot spots' - faulty cells or connections that are overheating and reducing efficiency.</p><blockquote class=\"my-8 p-6 bg-green-900 text-white rounded-lg text-2xl italic font-semibold text-center\">\u201cInnovation distinguishes between a leader and a follower.\u201d</blockquote><p>This data is then analyzed by AI software to pinpoint exact locations of faults, allowing maintenance teams to be highly targeted and efficient. This proactive approach prevents small problems from becoming large, costly failures.</p><h3 class=\"text-3xl font-bold my-6\">Benefits of Modern Inspection</h3><ul class=\"list-none space-y-2 my-4\"><li class=\"flex items-center\"><span class=\"text-green-500 mr-2\">&#10003;</span> <strong>Safety:</strong> Technicians no longer need to climb on dangerous rooftops.</li><li class=\"flex items-center\"><span class=\"text-green-500 mr-2\">&#10003;</span> <strong>Speed:</strong> Inspect hundreds of panels per hour, not per day.</li><li class=\"flex items-center\"><span class=\"text-green-500 mr-2\">&#10003;</span> <strong>Accuracy:</strong> Detects issues invisible to the naked eye.</li></ul><p>The future of solar inspection is smart, automated, and data-driven, ensuring that solar farms operate at their peak performance for decades.</p>",
  },
  {
    title: "Installing Panels on Rooftops",
    slug: "installing-panels-on-rooftops",
    date: "2025-11-12",
    author: "Ajay Singh",
    category: "Installation",
    mainImage: "/assets/blogs/post-3.webp",
    excerpt: "Rooftop solar installations are bringing power generation home. Learn about the process, from initial assessment to the final connection, and the benefits of home solar...",
    contentHtml: "<p>One of the most popular ways to adopt solar energy is by installing panels on your own rooftop. It's a direct way to cut energy costs and reduce your carbon footprint. <br></p><h3 class=\"text-3xl font-bold my-6\">The Installation Process</h3><p>A typical rooftop installation involves several key steps. First, a solar expert will assess your roof's condition, orientation, and shading to design the optimal system. After permits are approved, a team of certified installers will mount the racking, attach the panels, and connect the inverter, which converts the DC electricity from the panels to AC electricity for your home.</p><blockquote class=\"my-8 p-6 bg-green-900 text-white rounded-lg text-2xl italic font-semibold text-center\">\u201cThe best time to plant a tree was 20 years ago. The second best time is now. The same applies to solar.\u201d</blockquote><p>Finally, the system is connected to the grid. With 'net metering' policies, you can even sell excess electricity back to the utility company, further increasing your savings. <br><strong>\u092f\u0939 \u090f\u0915 \u092c\u0939\u0941\u0924 \u0905\u091a\u094d\u091b\u093e \u0928\u093f\u0935\u0947\u0936 \u0939\u0948\u0964</strong> (This is a very good investment.)</p><h3 class=\"text-3xl font-bold my-6\">Key Advantages of Rooftop Solar</h3><ul class=\"list-none space-y-2 my-4\"><li class=\"flex items-center\"><span class=\"text-green-500 mr-2\">&#10003;</span> Uses unused roof space effectively.</li><li class=\"flex items-center\"><span class=\"text-green-500 mr-2\">&#10003;</span> Increases the resale value of your property.</li><li class=\"flex items-center\"><span class=\"text-green-500 mr-2\">&#10003;</span> Provides a hedge against rising electricity prices.</li></ul><p>Rooftop solar is a powerful statement of sustainability and a practical step towards energy independence.</p>",
  },
  {
    title: "Why Panel Cleaning is Essential",
    slug: "panel-cleaning-essential",
    date: "2025-11-13",
    author: "Meera Gupta",
    category: "Maintenance",
    mainImage: "/assets/blogs/post-4.jpg",
    excerpt: "You wouldn't drive with a dirty windshield, so why let your solar panels get dirty? Regular cleaning is essential for maintaining peak efficiency and maximizing your investment...",
    contentHtml: "<p>Solar panels are a fantastic investment, but they are not 'set it and forget it'. Like any piece of high-performance equipment, they require basic maintenance. The most crucial part of this is regular cleaning. <br></p><h3 class=\"text-3xl font-bold my-6\">The Impact of Dirt and Grime</h3><p>Dust, dirt, pollen, bird droppings, and pollution can form a layer on your panels, blocking sunlight and reducing their ability to generate electricity. Studies have shown that dirty panels can lose anywhere from 5% to 25% of their efficiency. This means you are losing money every single day.</p><blockquote class=\"my-8 p-6 bg-green-900 text-white rounded-lg text-2xl italic font-semibold text-center\">\u201cA clean panel is a happy panel, and a happy panel is a productive panel.\u201d</blockquote><p>While rain can wash away some loose dust, it's often not enough to remove caked-on grime or oily residues from pollution. In dry, dusty areas (like many parts of India), this problem is even more significant.</p><h3 class=\"text-3xl font-bold my-6\">How to Clean Panels Safely</h3><ul class=\"list-none space-y-2 my-4\"><li class=\"flex items-center\"><span class=\"text-green-500 mr-2\">&#10003;</span> <strong>When:</strong> Clean early in the morning or late in the evening when panels are cool.</li><li class=\"flex items-center\"><span class=\"text-green-500 mr-2\">&#10003;</span> <strong>What:</strong> Use a soft brush and clean water. Avoid harsh detergents.</li><li class=\"flex items-center\"><span class=\"text-green-500 mr-2\">&#10003;</span> <strong>Who:</strong> For safety, especially on rooftops, it's best to hire professionals.</li></ul><p>Regular cleaning is a small price to pay to protect your 25-year investment and ensure you are getting every kilowatt-hour of clean energy you paid for.</p>",
  },
  {
    title: "A Day in the Life of a Solar Technician",
    slug: "solar-technician-life",
    date: "2025-11-14",
    author: "Vikram Nair",
    category: "Careers",
    mainImage: "/assets/blogs/post-5.jpg",
    excerpt: "What does a solar technician actually do? From installations to troubleshooting, these green-collar professionals are the backbone of the renewable energy revolution...",
    contentHtml: "<p>Solar technicians are the hands-on heroes of the clean energy industry. Their work is varied, skilled, and essential to powering our future. A 'typical' day can involve a wide range of tasks, depending on whether they specialize in installation, maintenance, or operations. <br></p><h3 class=\"text-3xl font-bold my-6\">The Installation Specialist</h3><p>For an installer, the day often starts at a new construction site or an existing home. Their job involves mapping out the roof, securely mounting the racking system, lifting and attaching the solar panels, and running the electrical conduit. It's a physically demanding job that requires precision, teamwork, and a strong understanding of safety protocols.</p><blockquote class=\"my-8 p-6 bg-green-900 text-white rounded-lg text-2xl italic font-semibold text-center\">\u201cChoose a job you love, and you will never have to work a day in your life. Especially if that job helps save the planet.\u201d</blockquote><p>They work closely with electricians to ensure the system is correctly wired to the inverter and the home's electrical panel. Every connection must be perfect to ensure safety and performance.</p><h3 class=\"text-3xl font-bold my-6\">The Maintenance & Operations Tech</h3><ul class=\"list-none space-y-2 my-4\"><li class=\"flex items-center\"><span class=\"text-green-500 mr-2\">&#10003;</span> <strong>Troubleshooting:</strong> Using diagnostic tools to find out why a system is underperforming.</li><li class=\"flex items-center\"><span class=\"text-green-500 mr-2\">&#10003;</span> <strong>Preventive Maintenance:</strong> Conducting regular check-ups, cleaning panels, and tightening connections.</li><li class=\"flex items-center\"><span class=\"text-green-500 mr-2\">&#10003;</span> <strong>Customer Service:</strong> Explaining issues to homeowners and ensuring they are satisfied.</li></ul><p>A career as a solar technician is more than just a job; it's a chance to be part of a fast-growing, high-impact industry that is making a real difference in the world.</p>",
  },
  {
    title: "Large Scale Solar Farms",
    slug: "large-scale-solar-farms",
    date: "2025-11-15",
    author: "Nityanandini Mehra",
    category: "Utility",
    mainImage: "/assets/blogs/post-6.jpeg",
    excerpt: "Moving beyond rooftops, utility-scale solar farms are transforming deserts and fields into massive power plants. These projects are key to decarbonizing our national grid...",
    contentHtml: "<p>When you see thousands of solar panels stretching as far as the eye can see, you're looking at a utility-scale solar farm. These are massive power plants that generate electricity and feed it directly into the high-voltage transmission grid, powering thousands of homes and businesses. <br></p><h3 class=\"text-3xl font-bold my-6\">Powering the Nation</h3><p>Unlike residential solar, which primarily serves a single home, solar farms are built to serve the grid. They are often developed by utility companies or independent power producers. Projects like the Bhadla Solar Park in Rajasthan, one of the largest in the world, demonstrate the scale and ambition of this sector.</p><blockquote class=\"my-8 p-6 bg-green-900 text-white rounded-lg text-2xl italic font-semibold text-center\">\u201cWe are living on this planet as if we had another one to go to. We don't. That's why we need large-scale solar.\u201d</blockquote><p>These projects are crucial for countries to meet their renewable energy targets and climate goals. They create economies of scale, driving down the cost of solar electricity to be competitive with, or even cheaper than, fossil fuels.</p><h3 class=\"text-3xl font-bold my-6\">Challenges and Innovations</h3><ul class=\"list-none space-y-2 my-4\"><li class=\"flex items-center\"><span class=\"text-green-500 mr-2\">&#10003;</span> <strong>Land Use:</strong> These projects require significant land, raising questions about land use.</li><li class=\"flex items-center\"><span class=\"text-green-500 mr-2\">&#10003;</span> <strong>Grid Integration:</strong> The grid must be modern-enough to handle variable energy.</li><li class=\"flex items-center\"><span class=\"text-green-500 mr-2\">&#10003;</span> <strong>Innovation:</strong> Many farms now use trackers to follow the sun or are co-located with battery storage.</li></ul><p>Large-scale solar farms are a testament to human ingenuity and a critical component of our global transition to a sustainable energy future.</p>",
  },
];

const seedBlogs = async () => {
  try {
    await connectDB();

    let created = 0;
    let updated = 0;

    for (const blog of blogs) {
      const result = await Blog.findOneAndUpdate(
        { slug: blog.slug },
        { ...blog, isPublished: true },
        { upsert: true, new: true, setDefaultsOnInsert: true, rawResult: true }
      );
      if (result.lastErrorObject?.updatedExisting) {
        updated++;
      } else {
        created++;
      }
    }

    console.log(`Seed complete — ${created} created, ${updated} updated.`);
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seedBlogs();