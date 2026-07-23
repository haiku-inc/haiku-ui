import SpecialtyDefensiveIcon from '@/assets/unicons/specialty/defensive.svg';
import SpecialtyForensicIcon from '@/assets/unicons/specialty/forensic.svg';
import SpecialtyOffensiveIcon from '@/assets/unicons/specialty/offensive.svg';
import SpecialtyRedBlueIcon from '@/assets/unicons/specialty/redblue.svg';
import './styles.scss';

type Specialty = 'none' | 'offensive' | 'defensive' | 'forensic' | 'redBlue';
interface SpecialtyTagProps {
  id: Specialty;
}

const SpecialtyTag = ({ id }: SpecialtyTagProps) => {
  const loweredId = id.toLowerCase() as Specialty;
  // testing set:
  // let loweredId = 'none' as Specialty;
  // loweredId = 'forensic' as Specialty;
  // loweredId = 'defensive' as Specialty;
  // loweredId = 'offensive' as Specialty;
  // loweredId = 'redBlue' as Specialty;

  const tags = {
    none: {
      label: '?',
      icon: null,
    },
    offensive: {
      label: 'Offensive',
      icon: <SpecialtyOffensiveIcon />,
    },
    defensive: {
      label: 'Defensive',
      icon: <SpecialtyDefensiveIcon />,
    },
    forensic: {
      label: 'Forensic',
      icon: <SpecialtyForensicIcon />,
    },
    redBlue: {
      label: 'Red + Blue',
      icon: <SpecialtyRedBlueIcon />,
    },
  };

  return (
    <div className={`specialty-box specialty-${loweredId}`}>
      {tags?.[loweredId]?.icon}
      <div className="caption">{!tags?.[loweredId] ? id : tags?.[loweredId]?.label}</div>
    </div>
  );
};

export default SpecialtyTag;
