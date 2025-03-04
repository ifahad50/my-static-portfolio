export interface ProjectType {
    id: number;
    slug: string;
    title: string;
    headerImage: string;
    technologiesUsed: string[];
    headerDescription: string;
    content: string;
}
export const projects: ProjectType[] = [
    {
        id: 1,
        slug: 'custom-e-commerce-solution',
        title: 'Custom E-Commerce Solution',
        headerImage: '/project-assets/international-salon-supplies-home.png',
        technologiesUsed: ['Next.js', 'WordPress', 'Retail Express', 'Elasticsearch', 'Nest.js', 'RabbitMQ', 'Tailwind CSS', 'TypeScript', 'PostgreSQL', 'Docker', 'Digital Ocean', 'CI/CD'],
        headerDescription: `I developed a cutting-edge e-commerce solution that combines modern technologies, seamless ERP integration, and Progressive Web App (PWA) capabilities to deliver an exceptional user experience and optimize business processes. The platform is built with a strong focus on scalability, performance, and responsiveness, ensuring it meets the demands of a dynamic and competitive market.
By leveraging Next.js, WordPress and Nest.js for a full-stack implementation, the solution provides a cohesive environment for frontend and backend operations. Elasticsearch powers advanced search functionality, while RabbitMQ ensures smooth communication between the website and ERP system for real-time data synchronization.
This solution has proven to be a robust, scalable, and efficient tool for business, offering not only an engaging shopping experience for customers but also a streamlined workflow for administrators.`,
        content: `<h3 class="ql-heading" data-block-id="block-f970cc62-f2a8-49f4-ba13-df5c79f484e5"><strong>Client: </strong>International Salon Supplies</h3>
<h3 class="ql-heading" data-block-id="block-ff4b17bd-590c-480a-888d-6d41c859777e"><strong>Role:</strong>&nbsp;Full Stack Developer</h3>
<h3 class="ql-heading" data-block-id="block-9bc45b25-202d-4829-9cc7-5232c5f0463c"><strong>Features</strong></h3>
<ol>
    <li><strong>Restrict Unregistered Users</strong>
        <ul>
            <li>Limit unregistered users to checkout only for training products.</li>
            <li>Prevent unregistered users from viewing or purchasing normal products.</li>
        </ul>
    </li>
    <li><strong>Hide Product Prices</strong>
        <ul>
            <li>Hide normal product prices for bots and logged-out users.</li>
            <li>Display a "Login to view prices" message to encourage account creation.</li>
        </ul>
    </li>
    <li><strong>ERP Integration for Order Management</strong>
        <ul>
            <li>Automate order placement in the ERP system.</li>
            <li>Reflect order statuses such as processed, completed, or canceled on the website in real time.</li>
        </ul>
    </li>
    <li><strong>Customer Approval Process</strong>
        <ul>
            <li>Implement a gated customer approval system for accessing specific functionalities.</li>
            <li>Automatically notify customers about approval status changes via email.</li>
        </ul>
    </li>
    <li><strong>Advanced Search with Elasticsearch</strong>
        <ul>
            <li>Enable full-text search, filters, and faceted navigation for products.</li>
            <li>Implement auto-suggestions and typo tolerance to improve search experience.</li>
        </ul>
    </li>
    <li><strong>Abandoned Cart Recovery</strong>
        <ul>
            <li>Send automated reminders to users who leave items in their carts without completing the purchase.</li>
            <li>Include personalized discounts or incentives to encourage checkout.</li>
        </ul>
    </li>
    <li><strong>Product Recommendations</strong>
        <ul>
            <li>Display “Frequently Bought Together” section on product pages.</li>
        </ul>
    </li>
    <li><strong>Customizable Shipping Options</strong></li>
</ol>
<ul>
    <li>Allow users to choose between multiple shipping providers and delivery speeds.</li>
    <li>Show real-time shipping cost calculations based on product weight and delivery location.</li>
</ul>
<ol>
    <li><strong>Order Tracking and Notifications</strong></li>
</ol>
<ul>
    <li>Provide customers with real-time order tracking via the website.</li>
    <li>Send order status updates (e.g., dispatched, out for delivery) via email or SMS.</li>
</ul>
<ol>
    <li><strong>Promotions and Discount Management</strong></li>
</ol>
<ul>
    <li>Create and manage discount codes, flash sales, and promotional campaigns.</li>
</ul>
<ol>
    <li><strong>Secure Payment Gateway Integration</strong></li>
</ol>
<ul>
    <li>Integrate multiple payment gateways (e.g., PayPal, Tyro and After pay) to give customers flexibility.</li>
</ul>
<ol>
    <li><strong>Inventory Management Integration</strong></li>
</ol>
<ul>
    <li>Sync product inventory between the website and ERP system to prevent overselling.</li>
    <li>Display low stock warnings and estimated restock dates for out-of-stock items.</li>
</ul>
<ol>
    <li><strong>User Account Dashboard</strong></li>
</ol>
<ul>
    <li>Provide customers with an account dashboard to view order history, track orders, and manage profile details.</li>
</ul>
<ol>
    <li><strong>Mobile-First Responsive Design</strong></li>
</ol>
<ul>
    <li>Ensure the website is fully responsive and optimized for mobile devices.</li>
    <li>Add features like touch-friendly navigation and quick product view for mobile users.</li>
</ul>
<ol>
    <li><strong>Add to Home Screen</strong></li>
</ol>
<ul>
    <li>Provide a seamless way for users to install the e-commerce platform on their mobile or desktop devices directly from the browser.</li>
</ul>
<ol>
    <li><strong>Native App-Like Experience</strong></li>
</ol>
<ul>
    <li>Offer a full-screen, app-like experience with smooth transitions and minimal load times.</li>
</ul>
<ol>
    <li><strong>Progressive Image Loading</strong></li>
</ol>
<ul>
    <li>Optimize images for fast loading with lazy loading and adaptive resolutions based on the user’s device and network.</li>
</ul>
<h3 class="ql-heading" data-block-id="block-401528ad-1b2b-4688-a57f-494c5f9eb829"><strong>Links</strong></h3>
<div class="ql-block" data-block-id="block-df3f36e4-6f9c-4289-9a20-ab98b6f4a85c"><a class="ql-link" target="_blank" rel="noopener noreferrer" href="https://www.internationalsalonsupplies.com.au/">https://www.internationalsalonsupplies.com.au/</a></div>`,
    },
]