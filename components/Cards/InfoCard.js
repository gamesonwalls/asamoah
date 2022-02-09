import React from "react";
import { Card, CardBody } from "@windmill/react-ui";

function InfoCard({ title, value, children: icon }) {
  return (
    <Card className="border rounded-3xl  shadow-xl p-2 ">
      <CardBody className="flex items-center">
        {icon}
        <div>
          <p className="mb-2 text-xl font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            {value}
          </p>
        </div>
      </CardBody>
    </Card>
  );
}

export default InfoCard;
