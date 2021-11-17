import React from 'react';
import { EventsContext } from '../../contexts/EventsContext';
import ScheduleSelector from 'react-schedule-selector';
import { useContext } from 'react';

const VoteResult = ({ eventId, userName, numberOfGrid }) => {
  const { dispatch } = useContext(EventsContext);
  const { eventData } = useContext(EventsContext);
  const availability = eventData.find((e) => e.id === eventId).availability;
  const schedule = availability.map((a) => a.schedules);
  const selectedTime = [];
  schedule.forEach((s1) => s1.forEach((s2) => selectedTime.push(s2)));
  const votingCount = {};
  selectedTime.forEach((e) =>
    votingCount[e] ? votingCount[e]++ : (votingCount[e] = 1)
  );

  const renderCustomDateCell = (time, selected, innerRef) => (
    <div style={{ textAlign: 'center' }} ref={innerRef}>
      {selected ? `${votingCount[time]}` : ' '}
      {console.log(time)}
    </div>
  );

  const editTime = (e) => {
    e.preventDefault();
    dispatch({ type: 'deleteSchedule', schedule, eventId, userName });
  };
  //show timeselector page again by deleting user's availability

  return (
    <div>
      <h3 className='text-xl mt-4 mb-4 font-bold'>View Voting Results</h3>
      <ScheduleSelector
        // showing selected time from all users
        selection={selectedTime}
        numDays={numberOfGrid}
        minTime={8}
        maxTime={22}
        hourlyChunks={1}
        renderDateCell={renderCustomDateCell}
      />
      <button onClick={editTime}>Edit</button>
    </div>
  );
};

export default VoteResult;
