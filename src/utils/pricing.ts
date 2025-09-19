import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export type Pricing = CollectionEntry<"pricing">;

export const getAllPricing = async (): Promise<Pricing[]> => {
  const pricing = await getCollection("pricing");
  return sortPricingPlans(pricing);
};

/**
 * Sorts the pricing plans to show the popular plan in the middle
 * Specific order: Consulting -> Development (popular) -> Enterprise
 * @param plans Array of pricing plans
 * @returns Sorted array with the popular plan in the middle
 */
const sortPricingPlans = (plans: Pricing[]): Pricing[] => {
  // Desired specific order for the 3 plans
  const desiredOrder = ["Consulting", "Development", "Enterprise"];

  // Create a map of plans by name for quick access
  const planMap = new Map<string, Pricing>();
  plans.forEach((plan) => {
    planMap.set(plan.data.name, plan);
  });

  // Sort according to the desired order, putting unfound plans at the end
  const orderedPlans: Pricing[] = [];

  // Add plans in the specific order
  desiredOrder.forEach((planName) => {
    const plan = planMap.get(planName);
    if (plan) {
      orderedPlans.push(plan);
      planMap.delete(planName);
    }
  });

  // Add any remaining plans (in case more are added in the future)
  const remainingPlans = Array.from(planMap.values()).sort((a, b) =>
    a.data.name.localeCompare(b.data.name),
  );

  return [...orderedPlans, ...remainingPlans];
};
