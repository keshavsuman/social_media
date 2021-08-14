import React from 'react'
import edit from "../../../static/image/edit.svg"

const SkillsTab = () =>  {
    return (
<div>
  <div className="tab-pane fade show active" id="skills">
    <div className="row">
      <div className="col-sm-12">
        <div className="ctable">
          <h2>Skills &amp; Endorsements</h2>
          <a><span>Add new skill</span> <i className="icon"><img src={edit} alt /></i></a>
          <div className="tab-info">
            <table className="table">
              <tbody>
                <tr>
                  <td className="data">Office Management</td>
                </tr>
                <tr>
                  <td className="data">Office Suite</td>
                </tr>
                <tr>
                  <td className="data">Graphic Design</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="tab-info border-0">
            <h3>Industry Knowledge</h3>
            <table className="table">
              <tbody>
                <tr>
                  <td className="data border-0">Computer Graphics</td>
                  <td className="data border-0">3D Visulalization</td>
                </tr>
                <tr>
                  <td className="data border-0">Autodesk</td>
                  <td className="data border-0">Interior Design</td>
                </tr>
                <tr>
                  <td className="data border-0">3D Modeling</td>
                  <td className="data border-0">Site Planning</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="tab-info border-0">
            <h3>Industry Knowledge</h3>
            <table className="table">
              <tbody>
                <tr>
                  <td className="data border-0">Computer Graphics</td>
                  <td className="data border-0">3D Visulalization</td>
                </tr>
                <tr>
                  <td className="data border-0">Autodesk</td>
                  <td className="data border-0">Interior Design</td>
                </tr>
                <tr>
                  <td className="data border-0">3D Modeling</td>
                  <td className="data border-0">Site Planning</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    )
}

export default SkillsTab
