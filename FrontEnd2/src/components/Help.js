import React from 'react';

const Help = ({link}) => {
    return (
        <div id="help">
            <div className="fixed bottom-8 right-8">
                <a href={link} className="text-4xl flex items-center justify-center font-bold w-16 h-16 bg-blue-500 text-white rounded-full p-4">
                    ?
                </a>
            </div>
        </div>
    );
};

export default Help;