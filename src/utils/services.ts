import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export type Service = CollectionEntry<"services">;

export const getAllServices = async (): Promise<Service[]> => {
  const services = await getCollection("services");
  return sortServices(services);
};

/**
 * Sorts the services to show the featured service first
 * @param services Array of services
 * @returns Sorted array with featured service first
 */
const sortServices = (services: Service[]): Service[] => {
  return services.sort((a, b) => {
    // Featured services first
    if (a.data.featured && !b.data.featured) return -1;
    if (!a.data.featured && b.data.featured) return 1;

    // Then alphabetically
    return a.data.name.localeCompare(b.data.name);
  });
};
