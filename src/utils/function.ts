
export const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
};


export const formatDateWithOutHourAndTime = (dateString: string) => {
    return dateString.split('T')[0];
};

