// const sverokModel = {
//     createMember: async (member) => {
//         const api_key = "YQ/MwTyBxSu1Sy9UIzw0f7ox2Y8cx6bd";
//         const time = new Date().toLocaleDateString('sv-SE');
//         const body = {
//             api_key: api_key,
//             "member": {
//                 firstname: member.firstname,
//                 lastname: member.lastname,
//                 email: member.email,
//                 phone1: member.phone1,
//                 street: member.address,
//                 zip_code: member.zip,
//                 city: member.city,
//                 member_nick: member.nickname,
//                 socialsecuritynumber: member.ssn,
//                 renewed: time,
//             }
//         }
//         const response = await fetch(`https://ebas.sverok.se/apis/submit_member.json`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(body),
//         });
//         const data = await response.json();
//         return data;
//     }
// }
// export default sverokModel;