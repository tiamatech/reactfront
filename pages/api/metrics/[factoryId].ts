import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Use factoryId to generate specific metrics
  const mockMetrics = {
    airCondition: "İyi",
    temperature: 25,
    lights: "On",
    machineCondition: 95,
    forkliftCount: 3,
    employeeCount: 15,
  };

  res.status(200).json(mockMetrics);
}
