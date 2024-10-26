import React from "react";

const OurHistoryPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto text-gray-800">
        {/* Page Title */}
        <h1 className="text-5xl font-bold text-center text-yellow-500 mb-12">
          Our History
        </h1>

        {/* Introduction */}
        <p className="text-lg text-center mb-12">
          Ans Engineering Group Ltd has been a pioneer in quality,
          sustainability, and safety since its founding in 2015. Our journey
          reflects a commitment to innovation and excellence in engineering
          consultancy and construction services across East Africa.
        </p>

        {/* History Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-yellow-600">
            Founding and Growth
          </h2>
          <p>
            Ans Engineering Group Ltd was founded in March 2015 as a limited
            liability company based in Kenya. Initially focused on building
            projects, we have since diversified to include transportation
            infrastructure, environmental management, and more. This growth has
            been possible through a continuous commitment to quality and safety,
            expanding our team from a modest 2-person staff to a dynamic team of
            12 professionals.
          </p>
        </section>

        {/* Vision and Mission */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-yellow-600">
            Vision and Mission
          </h2>
          <p>
            <strong>Vision:</strong> To become a leading engineering consultancy
            and construction services provider, known for executing projects to
            world-class standards and delivering significant value to our
            stakeholders.
          </p>
          <p className="mt-4">
            <strong>Mission:</strong> To achieve excellence in engineering
            consultancy and construction services through teamwork,
            accountability, and adherence to industry best practices, with a
            strong focus on health and safety standards.
          </p>
        </section>

        {/* Core Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-yellow-600">
            Core Values
          </h2>
          <ul className="list-disc list-inside ml-6 space-y-2">
            <li>
              <strong>Quality, Sustainability, and Safety:</strong> These are
              the pillars of our operations, ensuring that all projects meet
              rigorous standards and deliver maximum customer value.
            </li>
            <li>
              <strong>Respect for Our People:</strong> Empowering our team to
              innovate, grow, and meet clear performance objectives to achieve
              both individual and project success.
            </li>
            <li>
              <strong>Environmental Responsibility:</strong> We aim to minimize
              environmental impact through sustainable practices, optimizing
              energy consumption and waste management.
            </li>
            <li>
              <strong>Safe Operating Practices:</strong> Our continuous training
              and awareness programs emphasize safety, striving for a
              zero-incident workplace.
            </li>
            <li>
              <strong>Competitive Solutions:</strong> Delivering timely,
              cost-effective solutions that exceed client expectations and
              reflect our commitment to quality.
            </li>
          </ul>
        </section>

        {/* Strategic Alliances */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-yellow-600">
            Strategic Alliances
          </h2>
          <p>
            To expand our expertise and service offerings, Ans Engineering Group
            Ltd has established partnerships with various consulting firms.
            These alliances enable technical cooperation, staff exchange, and
            joint ventures, providing access to the latest industry developments
            and strengthening our capacity to deliver innovative solutions.
          </p>
        </section>

        {/* Health, Safety, and Environmental Policy */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-yellow-600">
            Health, Safety, and Environmental Policy
          </h2>
          <p>
            We recognize the importance of health, safety, and environmental
            management for our success. Our goal is to provide a safe and
            healthy work environment while upholding environmental
            responsibility. We adhere to stringent safety standards, ensuring a
            workplace that supports our team’s well-being and fosters
            high-quality service delivery.
          </p>
          <p className="mt-4">
            <strong>Our Responsibilities:</strong> Each team member plays a
            vital role in maintaining our safety standards. Senior management
            provides resources and training, managers ensure program
            implementation, and employees are accountable for safe practices and
            participation in safety initiatives.
          </p>
        </section>

        {/* Conclusion */}
        <section className="text-center">
          <p className="text-lg text-gray-600">
            Ans Engineering Group Ltd continues to lead with integrity,
            innovation, and a strong commitment to sustainable engineering
            practices. As we move forward, we remain dedicated to delivering
            excellence and upholding our core values in every project.
          </p>
        </section>
      </div>
    </div>
  );
};

export default OurHistoryPage;
