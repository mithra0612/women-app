import React, { useState } from 'react';
import { Book } from 'lucide-react';

// Rights data with three more new rights
const rights = [
  {
    title: "Right to Equal Pay",
    law: "The Equal Remuneration Act, 1976",
    description: "Mandates that women receive equal pay for equal work, prohibiting discrimination in remuneration on the basis of gender.",
    violation: "Violation of this law can lead to legal action, fines, and potential imprisonment for the offenders.",
    actions: "Women can file a complaint under the Equal Remuneration Act, and they are entitled to equal pay, and can seek compensation for discrimination.",
    color: "from-blue-100 to-blue-50 border-blue-300"
  },
  {
    title: "Right Against Domestic Violence",
    law: "The Protection of Women from Domestic Violence Act, 2005",
    description: "Provides protection to women from physical, emotional, verbal, and economic abuse by family members.",
    violation: "Violation of this law can result in penalties, including imprisonment, and the perpetrator may be ordered to pay for damages.",
    actions: "Women can file complaints with the police, seek orders for protection, and apply for residence orders to prevent further violence.",
    color: "from-purple-100 to-purple-50 border-purple-300"
  },
  {
    title: "Right to Maternity Benefits",
    law: "The Maternity Benefit Act, 1961",
    description: "Entitles women to paid maternity leave and other benefits during pregnancy and after childbirth.",
    violation: "Employers violating this act may face penalties and legal action for denying maternity benefits.",
    actions: "Women can report violations to the labor department or seek legal assistance to ensure their rights are upheld.",
    color: "from-pink-100 to-pink-50 border-pink-300"
  },
  {
    title: "Right Against Sexual Harassment at Workplace",
    law: "The Sexual Harassment of Women at Workplace Act, 2013",
    description: "Aims to protect women from sexual harassment at their place of work.",
    violation: "Offenders may face penalties and legal consequences, including termination from their workplace and imprisonment.",
    actions: "Women can file complaints with the Internal Complaints Committee (ICC) or directly approach the police in case of harassment.",
    color: "from-indigo-100 to-indigo-50 border-indigo-300"
  },
  {
    title: "Right to Anonymity for Sexual Assault Victims",
    law: "Criminal Law Amendment Act",
    description: "To protect the privacy and dignity of victims, the law ensures that the identity of a sexual assault victim is not disclosed without their consent.",
    violation: "Anyone who discloses the victim's identity may face imprisonment and fines.",
    actions: "Victims can seek legal protection to maintain their anonymity, and legal action can be taken against violators.",
    color: "from-teal-100 to-teal-50 border-teal-300"
  },
  {
    title: "Right to Free Legal Aid",
    law: "Legal Services Authorities Act, 1987",
    description: "Women are entitled to free legal services, ensuring access to justice for those unable to afford legal representation.",
    violation: "Anyone denying access to legal aid may face legal consequences.",
    actions: "Women can approach Legal Aid Authorities for free legal services, ensuring they can assert their legal rights.",
    color: "from-green-100 to-green-50 border-green-300"
  },
  {
    title: "Right to Inherit Property",
    law: "Hindu Succession Act, 1956 (Amended 2005)",
    description: "Grants daughters equal rights to inherit ancestral property, ensuring parity with sons in inheritance matters.",
    violation: "Failure to honor inheritance rights can lead to legal consequences and court orders to distribute property equally.",
    actions: "Women can seek legal recourse if their inheritance rights are violated, including filing for a share in the family property.",
    color: "from-yellow-100 to-yellow-50 border-yellow-300"
  },
  // New rights added
  {
    title: "Right to Protection from Stalking",
    law: "The Protection of Women from Stalking Act, 2013",
    description: "This law protects women from stalking, including physical and online stalking.",
    violation: "Offenders can face imprisonment for up to three years and a fine. Aggravated circumstances may extend the punishment to five years.",
    actions: "Women can file a police complaint for stalking, seek a restraining order, and take legal action.",
    color: "from-orange-100 to-orange-50 border-orange-300"
  },
  {
    title: "Right to Protection from Female Genital Mutilation (FGM)",
    law: "Prevention of Female Genital Mutilation (FGM) Act, 2020",
    description: "This law criminalizes the practice of female genital mutilation (FGM), a harmful practice where parts of the female genitalia are removed.",
    violation: "Offenders can face imprisonment of up to seven years, and facilitators of the practice may also face severe penalties.",
    actions: "Women can report FGM to the police, and legal action can be taken against those involved in the procedure.",
    color: "from-red-100 to-red-50 border-red-300"
  },
  // New Rights (3 additional rights)
  {
    title: "Right to Education",
    law: "Right of Children to Free and Compulsory Education Act, 2009",
    description: "Ensures that all children, including girls, have access to free and compulsory education until the age of 14.",
    violation: "Failure to provide education as per this law can lead to penalties for institutions and the government.",
    actions: "Parents can file complaints with education authorities, and NGOs can assist in ensuring access to education for girls.",
    color: "from-blue-200 to-blue-100 border-blue-500"
  },
  {
    title: "Right to Health Care",
    law: "National Health Policy, 2017",
    description: "Women are entitled to receive health care services, including maternal health, reproductive care, and free healthcare in public hospitals.",
    violation: "Failure to provide healthcare may lead to legal action, with hospitals facing fines or sanctions.",
    actions: "Women can seek health care services at government hospitals, file complaints with health departments if denied care, and access reproductive health services.",
    color: "from-teal-200 to-teal-100 border-teal-500"
  },
  {
    title: "Right to Safety and Security",
    law: "The Criminal Law Amendment Act, 2013",
    description: "Aimed at providing safety and security to women from various forms of violence, including acid attacks and other forms of assault.",
    violation: "Offenders face severe penalties, including imprisonment and fines.",
    actions: "Women can file complaints with police stations, seek protection orders, and pursue legal action against offenders.",
    color: "from-yellow-200 to-yellow-100 border-yellow-500"
  }
];

const Rights = () => {
  const [selectedRight, setSelectedRight] = useState(null);

  const openPopup = (right) => {
    setSelectedRight(right);
  };

  const closePopup = () => {
    setSelectedRight(null);
  };

  return (
    <div className="flex pt-20">
      {/* Sidebar Space */}
      <div className="w-[250px]"></div>

      {/* Rights Content */}
      <div className="flex-1 p-4 ml-[-270px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-[-87px]">
          {rights.map((right, index) => (
            <div
              key={index}
              className={`bg-gradient-to-b ${right.color} border rounded-lg shadow-lg p-5 flex flex-col justify-between transition-transform hover:scale-105 hover:shadow-xl cursor-pointer`}
              onClick={() => openPopup(right)}
            >
              <div>
                <div className="flex items-start gap-3">
                  <Book className="h-6 w-6 text-blue-700 mt-1 flex-shrink-0" />
                  <h3 className="text-lg font-bold text-gray-800">{right.title}</h3>
                </div>
                <p className="text-sm text-gray-700 font-medium mt-2">{right.law}</p>
                <p className="text-sm text-gray-600 mt-2">{right.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Popup for Detailed Information */}
        {selectedRight && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] max-w-xl">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{selectedRight.title}</h2>
              <p className="text-sm text-gray-700 mb-4">
                <strong>Law:</strong> {selectedRight.law}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <strong>Description:</strong> {selectedRight.description}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <strong>What happens if violated:</strong> {selectedRight.violation}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <strong>Actions to take:</strong> {selectedRight.actions}
              </p>
              <button
                className="text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                onClick={closePopup}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rights;
