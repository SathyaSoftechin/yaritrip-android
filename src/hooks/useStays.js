import { useQuery } from '@tanstack/react-query';
import stayService from '../services/stayService';

const REGIONS = ['NORTH', 'SOUTH', 'EAST', 'WEST'];

export const useStays = (activeRegion) => {
  const { data: stays = [], isLoading, error } = useQuery({
    queryKey: ['stays', activeRegion],
    queryFn: () => stayService.getStaysByRegion(activeRegion),
    enabled: !!activeRegion,
    staleTime: 5 * 60 * 1000,
  });

  return {
    stays,
    staysLoading: isLoading,
    staysError: error,
    regions: REGIONS,
  };
};